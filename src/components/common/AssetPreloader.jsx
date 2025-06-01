import { useEffect } from 'react';
import AssetLoader from '../utils/assetLoader';

const AssetPreloader = ({ assets, priority = 1, onProgress, onComplete }) => {
  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Format assets into the required structure
        const formattedAssets = assets.map(src => ({
          src,
          type: AssetLoader.getAssetType(src),
          priority
        }));

        // Set up progress callback
        AssetLoader.setProgressCallback(onProgress);

        // Load assets with specified priority
        await AssetLoader.preloadAssets(formattedAssets, priority);
        
        onComplete?.();
      } catch (error) {
        console.error('Failed to preload assets:', error);
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
