import { defineProperties } from "figma:react";

'use client';

import { useEffect, useRef, useState } from 'react';

export type UnicornSceneProps = {
  projectId?: string;
  jsonFilePath?: string;
  width?: number | string;
  height?: number | string;
  scale?: number;
  dpi?: number;
  fps?: number;
  altText?: string;
  ariaLabel?: string;
  className?: string;
  lazyLoad?: boolean;
};

export default function UnicornScene({
  projectId,
  jsonFilePath,
  width = "100%",
  height = "100%",
  scale = 1,
  dpi = 1.5,
  fps = 60,
  altText = "Unicorn Scene",
  ariaLabel = altText,
  className = "",
  lazyLoad = false,
}: UnicornSceneProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy: () => void } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scriptId = useRef(`us-data-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeScript = (callback: () => void) => {
      const version = '1.4.31';

      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]'
      );

      if (existingScript) {
        if ((window as Window & { UnicornStudio?: unknown }).UnicornStudio) {
          callback();
        } else {
          existingScript.addEventListener('load', callback);
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`;
      script.async = true;

      script.onload = () => {
        callback();
      };
      script.onerror = () => setError('Failed to load UnicornStudio script');

      document.body.appendChild(script);
    };

    const initializeScene = async () => {
      try {
        if (!elementRef.current) {
          setError('Element ref not available');
          return;
        }

        // Clean up any existing scene first
        if (sceneRef.current?.destroy) {
          sceneRef.current.destroy();
          sceneRef.current = null;
        }

        if (jsonFilePath) {
          elementRef.current.setAttribute(
            "data-us-project-src",
            `${jsonFilePath}`
          );
        } else if (projectId) {
          const [cleanProjectId, query] = projectId.split("?");
          const production = query?.includes("production");

          elementRef.current.setAttribute('data-us-project', cleanProjectId);

          if (production) {
            elementRef.current.setAttribute("data-us-production", "1");
          }
        } else {
          throw new Error('No project ID or JSON file path provided');
        }

        interface UnicornStudioType {
          init: (config: { scale: number; dpi: number }) => Promise<Array<{
            element: HTMLElement;
            destroy: () => void;
            contains?: (element: HTMLElement | null) => boolean;
          }>>;
        }

        const UnicornStudio = (window as Window & { UnicornStudio?: UnicornStudioType }).UnicornStudio;

        if (!UnicornStudio) {
          throw new Error('UnicornStudio not found');
        }

        // Add a small delay to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        const scenes = await UnicornStudio.init({
          scale,
          dpi,
        });

        const ourScene = scenes.find(
          (scene) =>
            scene.element === elementRef.current ||
            (scene.element.contains && scene.element.contains(elementRef.current))
        );
        
        if (ourScene) {
          sceneRef.current = ourScene;
          setError(null); // Clear any previous errors
        } else {
          setError('Could not find matching scene');
        }
      } catch (err) {
        setError(`Scene initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    // Add a small delay before initializing to ensure component is mounted
    const timeoutId = setTimeout(() => {
      initializeScript(() => {
        void initializeScene();
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (sceneRef.current?.destroy) {
        try {
          sceneRef.current.destroy();
        } catch (err) {
          console.warn('Error destroying scene:', err);
        }
        sceneRef.current = null;
      }
      if (jsonFilePath) {
        const script = document.getElementById(scriptId.current);
        script?.remove();
      }
    };
  }, [projectId, jsonFilePath, scale, dpi]);

  return (
    <div
      ref={elementRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
      className={className}
      role="img"
      aria-label={ariaLabel}
      data-us-dpi={dpi}
      data-us-scale={scale}
      data-us-fps={fps}
      data-us-alttext={altText}
      data-us-arialabel={ariaLabel}
      data-us-lazyload={lazyLoad ? "true" : ""}
    >
      {error && <div className="absolute top-4 left-4 text-red-500 bg-black/50 p-2 rounded">{error}</div>}
    </div>
  );
}
defineProperties(UnicornScene, {
  projectId: {
    label: "Project Id",
    type: "string",
    defaultValue: "Add your project Id",
  },
  scale: {
    type: 'number',
    label: "Scale",
    defaultValue: 1
  },
  dpi: {
    type: 'number',
    label: "DPI",
    defaultValue: 1.5
  },
  fps: {
    type: 'number',
    label: "FPS",
    defaultValue: 60
  }
});