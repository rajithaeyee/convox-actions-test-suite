console.log("╔══════════════════════════════════════════╗");
console.log("║       Environment Verification           ║");
console.log("╠══════════════════════════════════════════╣");
console.log(`║  NODE_ENV:   ${(process.env.NODE_ENV || "unset").padEnd(27)} ║`);
console.log(`║  RELEASE:    ${(process.env.RELEASE || "unset").padEnd(27)} ║`);
console.log(`║  PORT:       ${(process.env.PORT || "unset").padEnd(27)} ║`);
console.log(`║  NODE:       ${process.version.padEnd(27)} ║`);
console.log(`║  PLATFORM:   ${process.platform.padEnd(27)} ║`);
console.log(`║  ARCH:       ${process.arch.padEnd(27)} ║`);
console.log(`║  PID:        ${String(process.pid).padEnd(27)} ║`);
console.log("╚══════════════════════════════════════════╝");

// Print all CONVOX_ env vars if present
const convoxVars = Object.entries(process.env).filter(([k]) =>
  k.startsWith("CONVOX")
);
if (convoxVars.length > 0) {
  console.log("\nConvox environment variables:");
  convoxVars.forEach(([k, v]) => {
    // Mask sensitive values
    const masked = k.includes("PASSWORD") || k.includes("KEY")
      ? "****"
      : v;
    console.log(`  ${k}=${masked}`);
  });
}

console.log("\n\x1b[32m Environment check complete\x1b[0m");
process.exit(0);
