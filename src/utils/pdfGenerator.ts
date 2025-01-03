import jsPDF from "jspdf";
import { Item } from "@/types/item";
import { CategoryType } from "@/components/CategorySelector";

export const generatePDF = (
  items: Item[],
  title: string,
  category: CategoryType,
  showPricing: boolean,
  currencySymbol: string
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  let pageNum = 1;
  
  const addHeader = () => {
    yPosition = margin;
    
    // Add logo or title
    pdf.setFontSize(24);
    pdf.setTextColor(128, 0, 128);
    pdf.text("Lovable Lists", pageWidth / 2, yPosition, { align: "center" });
    
    // Add page number
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - margin, { align: "right" });
    
    // Add list title
    yPosition += 25;
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `${title || category.charAt(0).toUpperCase() + category.slice(1)} List`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    
    // Add date
    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      new Date().toLocaleDateString(),
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    
    yPosition += 25;
  };

  // Add first page header
  addHeader();
  
  // Set consistent font for items
  pdf.setFontSize(12);

  items.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin * 2) {
      pdf.addPage();
      pageNum++;
      addHeader();
    }
    
    const itemText = `${index + 1}. ${item.text}${
      item.isCollected ? " ✓" : ""
    }${
      showPricing && item.price
        ? ` - ${currencySymbol}${item.price.toFixed(2)}`
        : ""
    }`;
    
    // Draw a light gray background for completed items
    if (item.isCollected) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin - 5, yPosition - 5, pageWidth - (margin * 2) + 10, 10, "F");
    }
    
    pdf.setTextColor(item.isCollected ? 128 : 0, item.isCollected ? 128 : 0, item.isCollected ? 128 : 0);
    pdf.text(itemText, margin, yPosition);
    yPosition += 15;
  });

  // Add total if pricing is enabled
  if (showPricing && items.length > 0) {
    // Check if we need a new page for the total
    if (yPosition > pageHeight - margin * 3) {
      pdf.addPage();
      pageNum++;
      addHeader();
    }
    
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    yPosition += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Total: ${currencySymbol}${total.toFixed(2)}`,
      pageWidth - margin,
      yPosition + 10,
      { align: "right" }
    );
  }

  return pdf;
};