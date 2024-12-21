export const useImgPreload = async (assets: string[]) => {
  let left = assets.length;

  return new Promise<void>((resolve) => {
    useHead({
      link: assets.map((src) => ({
        rel: 'preload',
        as: 'image',
        href: src,
        onload() {
          if (!--left) {
            resolve();
            console.log('All images preloaded');
          }
        }
      }))
    });
  });
};
