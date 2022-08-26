let bar;

export async function startProgressAnimation() {
  getBar().then(b => b.start());
}

export async function finishProgressAnimation() {
  getBar().then(b => b.finish());
}

async function getBar() {
  if (!bar) {
    const ProgressBar = (await import("@badrap/bar-of-progress")).default;
    bar = new ProgressBar({
      delay: 500,
    });
  }

  return bar;
}
