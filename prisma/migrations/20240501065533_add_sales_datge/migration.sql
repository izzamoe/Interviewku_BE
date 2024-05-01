-- DropIndex
DROP INDEX `salespersonDateIndex` ON `sales`;

-- CreateIndex
CREATE INDEX `salesDateIndex` ON `Sales`(`SalesID`, `SalesDate`);
