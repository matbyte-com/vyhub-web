function focus() {
  localStorage.setItem('sessionId', String(sessionStorage.getItem('sessionId')));
}

export default {
  registerSessionService() {
    const random = String(Math.random() * 1000);
    localStorage.setItem('sessionId', random);
    sessionStorage.setItem('sessionId', random);
    document.addEventListener('focus', () => {
      focus();
    });
  },
  /**
   * Returns true when the current tab was the last active tab
   */
  lastActiveWindow() {
    return localStorage.getItem('sessionId') === sessionStorage.getItem('sessionId');
  },
};
