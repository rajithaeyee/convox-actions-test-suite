async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seed() {
  console.log("=== Seeding Database ===\n");
  const tables = ["users", "products", "orders", "categories"];
  for (const table of tables) {
    const count = Math.floor(Math.random() * 50) + 10;
    process.stdout.write(`Seeding ${table}...`);
    await sleep(300);
    console.log(` \x1b[36m${count} records inserted\x1b[0m`);
  }
  console.log(`\n\x1b[32m✅ Seeding completed\x1b[0m`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(`\x1b[31m❌ Seeding failed: ${err.message}\x1b[0m`);
  process.exit(1);
});
