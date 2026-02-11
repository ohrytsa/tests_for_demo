/**
 * Script to convert npm audit JSON report to HTML format
 * Integrates dependency audit with linter reports
 */

const fs = require("fs");
const path = require("path");

const REPORTS_DIR = path.join(__dirname, "..", "reports");
const AUDIT_JSON = path.join(REPORTS_DIR, "audit-report.json");
const AUDIT_HTML = path.join(REPORTS_DIR, "audit-report.html");

function generateHTML(auditData) {
  const severityColors = {
    critical: "#d32f2f",
    high: "#f57c00",
    moderate: "#fbc02d",
    low: "#388e3c",
    info: "#1976d2",
  };

  const vulnerabilities = auditData.vulnerabilities || {};
  const metadata = auditData.metadata || {};

  let vulnRows = "";
  for (const [pkgName, vuln] of Object.entries(vulnerabilities)) {
    const severity = vuln.severity || "info";
    const color = severityColors[severity] || "#666";
    vulnRows += `
      <tr>
        <td>${pkgName}</td>
        <td style="color: ${color}; font-weight: bold;">${severity.toUpperCase()}</td>
        <td>${vuln.via?.map((v) => (typeof v === "string" ? v : v.title || v.name)).join(", ") || "N/A"}</td>
        <td>${vuln.range || "N/A"}</td>
        <td>${vuln.fixAvailable ? "Yes" : "No"}</td>
      </tr>
    `;
  }

  if (!vulnRows) {
    vulnRows =
      '<tr><td colspan="5" style="text-align: center; color: #388e3c;">No vulnerabilities found!</td></tr>';
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dependency Audit Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #1976d2;
      padding-bottom: 10px;
    }
    .summary {
      display: flex;
      gap: 20px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .summary-card {
      background: #f8f9fa;
      padding: 15px 25px;
      border-radius: 8px;
      text-align: center;
      min-width: 120px;
    }
    .summary-card h3 {
      margin: 0;
      font-size: 24px;
    }
    .summary-card p {
      margin: 5px 0 0;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #1976d2;
      color: white;
    }
    tr:hover {
      background: #f5f5f5;
    }
    .timestamp {
      color: #666;
      font-size: 14px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔒 Dependency Audit Report</h1>
    
    <div class="summary">
      <div class="summary-card">
        <h3>${metadata.vulnerabilities?.total || 0}</h3>
        <p>Total Vulnerabilities</p>
      </div>
      <div class="summary-card" style="border-left: 4px solid #d32f2f;">
        <h3>${metadata.vulnerabilities?.critical || 0}</h3>
        <p>Critical</p>
      </div>
      <div class="summary-card" style="border-left: 4px solid #f57c00;">
        <h3>${metadata.vulnerabilities?.high || 0}</h3>
        <p>High</p>
      </div>
      <div class="summary-card" style="border-left: 4px solid #fbc02d;">
        <h3>${metadata.vulnerabilities?.moderate || 0}</h3>
        <p>Moderate</p>
      </div>
      <div class="summary-card" style="border-left: 4px solid #388e3c;">
        <h3>${metadata.vulnerabilities?.low || 0}</h3>
        <p>Low</p>
      </div>
    </div>

    <h2>Vulnerability Details</h2>
    <table>
      <thead>
        <tr>
          <th>Package</th>
          <th>Severity</th>
          <th>Issue</th>
          <th>Affected Versions</th>
          <th>Fix Available</th>
        </tr>
      </thead>
      <tbody>
        ${vulnRows}
      </tbody>
    </table>

    <p class="timestamp">Generated: ${new Date().toISOString()}</p>
  </div>
</body>
</html>
  `;
}

// Main execution
try {
  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  // Read audit JSON
  if (!fs.existsSync(AUDIT_JSON)) {
    console.error("Audit JSON file not found. Run 'npm run audit:deps' first.");
    process.exit(1);
  }

  const auditData = JSON.parse(fs.readFileSync(AUDIT_JSON, "utf8"));
  const html = generateHTML(auditData);

  fs.writeFileSync(AUDIT_HTML, html);
  console.log(`✅ Audit HTML report generated: ${AUDIT_HTML}`);
} catch (error) {
  console.error("Error generating audit report:", error.message);
  process.exit(1);
}
