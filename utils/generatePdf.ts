export const generatePdf = (values: any) => {
    try {
        const binaryString = window.atob(values.file);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.error('Failed to decode Base64 PDF:', error);
    }
};
