// Optional deploy-time API configuration.
// Leave empty for same-origin API (local full-stack server).
// Example for split deployment:
// window.FREESEWAA_API_BASE_URL = 'https://your-backend-domain.com';
window.FREESEWAA_API_BASE_URL = window.FREESEWAA_API_BASE_URL || '';

(function () {
	try {
		const value = String(window.FREESEWAA_API_BASE_URL || '').trim();
		if (value) {
			localStorage.setItem('freesewaa-api-base-url', value.replace(/\/+$/, ''));
		}
	} catch (error) {}
})();
