function fullscreen() {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      try {
        document.documentElement.requestFullscreen();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return handleFullscreen();
}

export default fullscreen;
