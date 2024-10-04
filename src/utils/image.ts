/**
 * 图片base64转blob
 * @param image
 * @returns {Blob}
 */
export function base64toBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 图片url转base64
 * @param url
 * @param mimeType
 */
export function urlToBase64(url: string, mimeType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mimeType || 'image/png');
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}

export function getImageSize(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = function () {
      reject();
    };
    img.src = url;
  });
}

export function compressImage(
  url: string,
  options: { width: number; height: number; quality: number; mimeType: string },
): Promise<string> {
  return new Promise((resolve, reject) => {
    const { width, height, quality, mimeType } = options;

    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const dataURL = canvas.toDataURL(mimeType || 'image/png', quality);
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}

export function calcImageSize(
  imageTrueW: number,
  imageTrueH: number,
  showAreaW: number,
  showAreaH: number,
): { width: number; height: number; ratio: number } {
  let [width, height, ratio] = [0, 0, 0];
  if (imageTrueW > imageTrueH) {
    if (imageTrueW >= showAreaW) {
      const imageRatioH = imageTrueH * (showAreaW / imageTrueW);
      if (imageRatioH >= showAreaW) {
        width = imageTrueW * (showAreaH / imageTrueH);
        height = showAreaH;
        ratio = imageTrueH / showAreaH;
      } else {
        width = showAreaW;
        height = imageRatioH;
        ratio = imageTrueW / showAreaW;
      }
    } else {
      width = imageTrueW;
      height = imageTrueH;
      ratio = 1;
    }
  } else {
    if (imageTrueH >= showAreaH) {
      width = imageTrueW * (showAreaH / imageTrueH);
      height = showAreaH;
      ratio = imageTrueH / showAreaH;
    } else {
      width = imageTrueW;
      height = imageTrueH;
      ratio = 1;
    }
  }
  return {
    width,
    height,
    ratio,
  };
}
