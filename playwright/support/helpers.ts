export function generateOrderCode() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    function randomString(length) {
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
  
      return Array.from(array, x => alphanumeric[x % alphanumeric.length]).join('');
    }
  
    return `VLO-${randomString(6)}`;
  }