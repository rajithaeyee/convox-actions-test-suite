/**
 * Long Output / Hang Test
 * The old action-run would hang on sustained output.
 * If this completes, the pseudo-TTY fix works.
 */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const TOTAL_LINES = 200;
  const DELAY_MS = 50;

  console.log("╔══════════════════════════════════════╗");
  console.log("║     Long Output / Hang Test          ║");
  console.log("╠══════════════════════════════════════╣");
  console.log(`║  Total lines: ${String(TOTAL_LINES).padEnd(22)} ║`);
  console.log(`║  Expected duration: ~${String(Math.round((TOTAL_LINES * DELAY_MS) / 1000) + "s").padEnd(16)} ║`);
  console.log("╚══════════════════════════════════════╝\n");

  const startTime = Date.now();

  for (let i = 1; i <= TOTAL_LINES; i++) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const payload = "x".repeat(Math.floor(Math.random() * 80) + 20);
    if (i % 50 === 0) {
      console.log(
        `\x1b[33m--- Checkpoint: ${i}/${TOTAL_LINES} (${elapsed}s) ---\x1b[0m`
      );
    } else {
      console.log(`[${String(i).padStart(3)}] [${elapsed}s] ${payload}`);
    }
    await sleep(DELAY_MS);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n\x1b[32m✅ Completed ${TOTAL_LINES} lines in ${totalTime}s - DID NOT HANG\x1b[0m`);
  process.exit(0);
}

run();
