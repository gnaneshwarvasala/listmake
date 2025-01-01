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
  
  // Add website name as header
  pdf.setFontSize(24);
  pdf.setTextColor(128, 0, 128); // Purple to match theme
  pdf.text("Lovable Lists", pageWidth / 2, 20, { align: "center" });
  
  // Add title and category
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text(
    `${title || category.charAt(0).toUpperCase() + category.slice(1)} List`,
    pageWidth / 2,
    40,
    { align: "center" }
  );

  // Add items
  pdf.setFontSize(12);
  items.forEach((item, index) => {
    const yPosition = 60 + (index * 10);
    const itemText = `${index + 1}. ${item.text}${
      item.isCollected ? " ✓" : ""
    }${
      showPricing && item.price
        ? ` - ${currencySymbol}${item.price.toFixed(2)}`
        : ""
    }`;
    pdf.text(itemText, 20, yPosition);
  });

  // Add total if pricing is enabled
  if (showPricing) {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    pdf.text(
      `Total: ${currencySymbol}${total.toFixed(2)}`,
      pageWidth - 40,
      60 + (items.length * 10),
      { align: "right" }
    );
  }

  // Add watermark to all pages
  const pages = pdf.internal.getNumberOfPages();
  const watermarkText = "Lovable Lists";
  pdf.setFontSize(40);
  pdf.setTextColor(230, 230, 230);
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.text(
      watermarkText,
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