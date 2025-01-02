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
  const margin = 20;
  let yPosition = margin;
  
  // Add header
  pdf.setFontSize(24);
  pdf.setTextColor(128, 0, 128);
  pdf.text("Lovable Lists", pageWidth / 2, yPosition, { align: "center" });
  
  // Add title
  yPosition += 25;
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text(
    `${title || category.charAt(0).toUpperCase() + category.slice(1)} List`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // Add items
  yPosition += 25;
  pdf.setFontSize(12);
  items.forEach((item, index) => {
    if (yPosition > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    const itemText = `${index + 1}. ${item.text}${
      item.isCollected ? " ✓" : ""
    }${
      showPricing && item.price
        ? ` - ${currencySymbol}${item.price.toFixed(2)}`
        : ""
    }`;
    
    pdf.text(itemText, margin, yPosition);
    yPosition += 10;
  });

  // Add total if pricing is enabled
  if (showPricing) {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    yPosition += 10;
    pdf.text(
      `Total: ${currencySymbol}${total.toFixed(2)}`,
      pageWidth - margin,
      yPosition,
      { align: "right" }
    );
  }

  // Add watermark to all pages
  const pages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(40);
    pdf.setTextColor(230, 230, 230);
    pdf.text(
      "Lovable Lists",
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() / 2,
      {
        align: "center",
        angle: 45
      }
    );
  }

  return pdf;
};