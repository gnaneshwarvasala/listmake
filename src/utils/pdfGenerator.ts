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
  
  // Add watermark
  const watermarkText = "Lovable Lists";
  pdf.setTextColor(200, 200, 200); // Light gray
  pdf.setFontSize(60);
  pdf.setGState({ opacity: 0.2 });
  
  // Calculate center position and add watermark
  const textWidth = pdf.getTextWidth(watermarkText);
  const xCenter = (pageWidth - textWidth) / 2;
  const yCenter = pageHeight / 2;
  pdf.text(watermarkText, xCenter, yCenter);
  
  const addHeader = () => {
    yPosition = margin;
    
    // Add logo or title with improved styling
    pdf.setFontSize(24);
    pdf.setTextColor(128, 0, 128);
    pdf.text("Lovable Lists", pageWidth / 2, yPosition, { align: "center" });
    
    // Add page number with better styling
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - margin, { align: "right" });
    
    // Add list title with enhanced styling
    yPosition += 25;
    pdf.setFontSize(18);
    pdf.setTextColor(51, 51, 51);
    pdf.text(
      `${title || category.charAt(0).toUpperCase() + category.slice(1)} List`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    
    // Add date with improved formatting
    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
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
    
    // Enhanced styling for items
    if (item.isCollected) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin - 5, yPosition - 5, pageWidth - (margin * 2) + 10, 10, "F");
    }
    
    pdf.setTextColor(item.isCollected ? 128 : 51, item.isCollected ? 128 : 51, item.isCollected ? 128 : 51);
    pdf.text(itemText, margin, yPosition);
    yPosition += 15;
  });

  // Add total if pricing is enabled with improved styling
  if (showPricing && items.length > 0) {
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
    pdf.setTextColor(51, 51, 51);
    pdf.text(
      `Total: ${currencySymbol}${total.toFixed(2)}`,
      pageWidth - margin,
      yPosition + 10,
      { align: "right" }
    );
  }

  return pdf;
};