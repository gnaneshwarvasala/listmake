import jsPDF from "jspdf";
import { Item } from "@/types/item";
import { CategoryType } from "@/components/CategorySelector";

export const generatePDF = (
  items: Item[],
  title: string,
  category: CategoryType,
  showPricing: boolean,
  currencySymbol: string
): jsPDF => {
  // Initialize PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Set up dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Add header
  doc.setFontSize(24);
  doc.setTextColor(0, 119, 182); // Primary dark color
  doc.text("Lovable Lists", pageWidth / 2, yPosition, { align: "center" });

  // Add title
  yPosition += 15;
  doc.setFontSize(18);
  doc.setTextColor(0, 150, 199); // Primary color
  doc.text(
    `${title || category.charAt(0).toUpperCase() + category.slice(1)} List`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // Add date
  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(72, 202, 234); // Secondary color
  doc.text(
    new Date().toLocaleDateString(),
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // Add items
  yPosition += 20;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  items.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    const itemText = `${index + 1}. ${item.text}${item.isCollected ? " ✓" : ""}`;
    doc.text(itemText, margin, yPosition);

    if (showPricing && item.price !== undefined) {
      const priceText = `${currencySymbol}${item.price.toFixed(2)}`;
      doc.text(priceText, pageWidth - margin - doc.getTextWidth(priceText), yPosition);
    }

    yPosition += 10;
  });

  // Add total if pricing is enabled
  if (showPricing && items.length > 0) {
    if (yPosition > pageHeight - margin * 2) {
      doc.addPage();
      yPosition = margin;
    }

    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    yPosition += 10;

    doc.setDrawColor(0, 180, 216); // Primary light color
    doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);

    doc.setFontSize(14);
    doc.setTextColor(0, 119, 182); // Primary dark color
    const totalText = `Total: ${currencySymbol}${total.toFixed(2)}`;
    doc.text(totalText, pageWidth - margin, yPosition + 5, { align: "right" });
  }

  // Add watermark
  doc.setTextColor(144, 224, 239, 0.3); // Accent color with opacity
  doc.setFontSize(60);
  const watermarkText = "Lovable Lists";
  const textWidth = doc.getTextWidth(watermarkText);
  doc.text(
    watermarkText,
    (pageWidth - textWidth) / 2,
    pageHeight / 2,
    { angle: 45 }
  );

  return doc;
};