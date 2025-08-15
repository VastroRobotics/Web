import { useEffect } from "react";
import AssetLoader from "../../utils/assetLoader";

const AssetPreloader = ({ assets, priority = 1, onProgress, onComplete }) => {
  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Format assets into the required structure
        const formattedAssets = assets.map((src) => ({
          src,
          type: AssetLoader.getAssetType(src),
          priority,
        }));

        // TODO: This code wasnt working correctly, so i removed video preloading functionality. But it still runs
        
        const supportedAsTypes = ["image", "style", "script", "font"]; // 'video' not supported
        // Use <link rel="preload"> for each asset
        for (const { src, type } of formattedAssets) {
          if (supportedAsTypes.includes(type)) {
            link.rel = "preload"; // Only rel preload non videos
          }
          const link = document.createElement("link");
          link.href = src;
          link.as = type;
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        }


        // Set up progress callback
        AssetLoader.setProgressCallback(onProgress);

        // Load assets with specified priority
        console.log("**CALL** PreloadAssets - await AsssetPreloader");
        console.log("(AssetPreloader) Preload Assets from this map: ");
        for (const { src, type } of formattedAssets) {
          console.log("-----" + src);
        }
        await AssetLoader.preloadAssets(formattedAssets, priority);

        onComplete?.();
      } catch (error) {
        console.error("Failed to preload assets:", error);
      }
    };

    loadAssets();

    // Cleanup
    return () => {
      AssetLoader.setProgressCallback(null);
    };
  }, [assets, priority, onProgress, onComplete]);

  return null;
};

export default AssetPreloader;
