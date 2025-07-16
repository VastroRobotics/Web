class AssetLoader {
  static cache = new Map();
  static priorityQueue = [];
  static concurrentLoads = 3;
  static activeLoads = 0;
  static onProgressCallback = null;

  static setProgressCallback(callback) {
    this.onProgressCallback = callback;
  }

  static updateProgress(loaded, total) {
    if (this.onProgressCallback) {
      this.onProgressCallback(loaded / total);
    }
  }

  static async preloadAssets(assets, priority = 1) {
    const tasks = assets.map(asset => ({
      src: asset.src,
      type: asset.type || this.getAssetType(asset.src),
      priority
    }));

    this.priorityQueue.push(...tasks);
    this.priorityQueue.sort((a, b) => b.priority - a.priority);
    
    return this.processQueue();
  }

  static getAssetType(src) {
    const ext = src.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    console.error("asset type: " + src);
    return 'fetch';
  }

  static async processQueue() {
    if (this.activeLoads >= this.concurrentLoads || this.priorityQueue.length === 0) {
      return;
    }

    const task = this.priorityQueue.shift();
    this.activeLoads++;

    try {
      const asset = task.type === 'video' 
        ? await this.preloadVideo(task.src)
        : await this.preloadImage(task.src);
      
      this.updateProgress(this.cache.size, this.cache.size + this.priorityQueue.length);
      return asset;
    } finally {
      this.activeLoads--;
      this.processQueue();
    }
  }

  static preloadVideo(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.onloadeddata = () => resolve(video);
      video.onerror = reject;
    });

    this.cache.set(src, promise);
    return promise;
  }

  static preloadImage(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    this.cache.set(src, promise);
    return promise;
  }
}

export default AssetLoader;
