const requestedCode = parseInt(process.argv[2] || "0", 10);

console.log("╔══════════════════════════════════════╗");
console.log("║       Exit Code Propagation Test     ║");
console.log("╠══════════════════════════════════════╣");
console.log(`║  Requested exit code: ${String(requestedCode).padEnd(15)} ║`);
console.log(`║  PID: ${String(process.pid).padEnd(30)} ║`);
console.log("╚══════════════════════════════════════╝");

if (requestedCode === 0) {
  console.log("\n\x1b[32m Exiting with code 0 (success)\x1b[0m");
} else {
  console.log(
    `\n\x1b[31m Exiting with code ${requestedCode} (failure)\x1b[0m`
  );
}

process.exit(requestedCode);
