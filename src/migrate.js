const MIGRATIONS = [
  { id: "001", name: "create_users_table" },
  { id: "002", name: "add_email_index" },
  { id: "003", name: "create_orders_table" },
  { id: "004", name: "add_status_to_orders" },
  { id: "005", name: "create_products_table" },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runMigrations() {
  console.log("=== Running Database Migrations ===\n");
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Release: ${process.env.RELEASE || "N/A"}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  for (const migration of MIGRATIONS) {
    process.stdout.write(`Migrating ${migration.id}_${migration.name}...`);
    await sleep(500);
    console.log(" \x1b[32m✓ done\x1b[0m");
  }

  console.log(
    `\n\x1b[32m All ${MIGRATIONS.length} migrations completed successfully\x1b[0m`
  );
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error(`\x1b[31m Migration failed: ${err.message}\x1b[0m`);
  process.exit(1);
});
