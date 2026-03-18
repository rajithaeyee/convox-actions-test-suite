/**
 * TTY Detection & Color Output Test
 * Tests whether pseudo-TTY allocation works in the action container.
 */

const isTTY = process.stdout.isTTY;

console.log("╔══════════════════════════════════════╗");
console.log("║      TTY Detection Test Results      ║");
console.log("╠══════════════════════════════════════╣");
console.log(`║  stdout.isTTY: ${String(isTTY).padEnd(20)} ║`);
console.log(`║  stdin.isTTY:  ${String(process.stdin.isTTY).padEnd(20)} ║`);
console.log(`║  stderr.isTTY: ${String(process.stderr.isTTY).padEnd(20)} ║`);
console.log(`║  TERM:         ${(process.env.TERM || "unset").padEnd(20)} ║`);
console.log(`║  columns:      ${String(process.stdout.columns || "N/A").padEnd(20)} ║`);
console.log("╚══════════════════════════════════════╝");

console.log("\n--- Color Output Test ---");
console.log("\x1b[31mRed text\x1b[0m");
console.log("\x1b[32mGreen text\x1b[0m");
console.log("\x1b[33mYellow text\x1b[0m");
console.log("\x1b[34mBlue text\x1b[0m");
console.log("\x1b[35mMagenta text\x1b[0m");
console.log("\x1b[36mCyan text\x1b[0m");
console.log("\x1b[1mBold text\x1b[0m");

console.log("\n--- Unicode Test ---");
console.log("✅ ❌ ⚡ 🚀 📦");

if (isTTY) {
  console.log(
    "\n\x1b[32m✅ TTY properly allocated - pseudo-TTY fix working!\x1b[0m"
  );
} else {
  console.log("\n\x1b[33m⚠️  No TTY detected - non-interactive mode\x1b[0m");
}

process.exit(0);
