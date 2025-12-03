/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScreenContainer,
  Logo,
  DividerWrapper,
  Line,
  DividerText,
  Footer,
  FooterText,
  FooterLogos,
  FooterLogo,
  MainContent,
  LogoDivider,
  PinkButton,
  LogoWrapper,
} from "./LandingPage.styles";

import { useQuery, useMutation, useAction } from "convex/react"; // Add useAction
import { api } from "../../../../convex/_generated/api";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch all feedback
  const feedbackData = useQuery(api.feedback.listFeedback);

  // Mutation to copy stories to professional_feedback safely
  const copyStories = useMutation(api.feedback.copyAllStoriesToFeedback);
  
  // Changed from useMutation to useAction
  // const updateFeedback = useAction(api.feedback.updateFeedbackFromCSV);

  const escapeCSV = (field: any): string => {
    if (field == null) return "";
    const str = String(field);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // const parseCSV = (csvText: string) => {
  //   const lines = csvText.split("\n");
  //   const result = [];
    
  //   for (let i = 1; i < lines.length; i++) { // Skip header row
  //     const line = lines[i].trim();
  //     if (!line) continue;

  //     // Simple CSV parser (handles quoted fields)
  //     const values = [];
  //     let current = "";
  //     let inQuotes = false;

  //     for (let j = 0; j < line.length; j++) {
  //       const char = line[j];
  //       const nextChar = line[j + 1];

  //       if (char === '"' && inQuotes && nextChar === '"') {
  //         current += '"';
  //         j++; // Skip next quote
  //       } else if (char === '"') {
  //         inQuotes = !inQuotes;
  //       } else if (char === "," && !inQuotes) {
  //         values.push(current);
  //         current = "";
  //       } else {
  //         current += char;
  //       }
  //     }
  //     values.push(current); // Push last value

  //     if (values.length >= 4) {
  //       result.push({
  //         storyId: values[0],
  //         title: values[1],
  //         content: values[2],
  //         feedback: values[3],
  //       });
  //     }
  //   }

  //   return result;
  // };

  // const handleUploadCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   setUploading(true);

  //   try {
  //     const text = await file.text();
  //     const parsedData = parseCSV(text);

  //     console.log("Parsed CSV data:", parsedData);

  //     // Update each feedback entry
  //     let successCount = 0;
  //     for (const row of parsedData) {
  //       try {
  //         await updateFeedback({
  //           storyId: row.storyId,
  //           feedback: row.feedback,
  //         });
  //         successCount++;
  //       } catch (err) {
  //         console.error(`Failed to update storyId ${row.storyId}:`, err);
  //       }
  //     }

  //     alert(`Successfully updated ${successCount} out of ${parsedData.length} feedback entries!`);
  //   } catch (err) {
  //     console.error("Error uploading CSV:", err);
  //     alert("Failed to upload CSV. See console for details.");
  //   } finally {
  //     setUploading(false);
  //     // Reset file input
  //     event.target.value = "";
  //   }
  // };

  const performDownload = () => {
    try {
      console.log(`Processing ${feedbackData!.length} feedback entries`);

      const headers = ["storyId", "title", "content", "feedback"];
      const csvRows = [
        headers.join(","),
        ...feedbackData!.map((row) =>
          [
            escapeCSV(row.storyId),
            escapeCSV(row.title),
            escapeCSV(row.content),
            escapeCSV(row.feedback),
          ].join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `professional_feedback_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      console.log(`Successfully downloaded ${feedbackData!.length} feedback entries`);
      setLoading(false);
    } catch (err) {
      console.error("Error downloading CSV:", err);
      alert("Failed to download CSV. See console for details.");
      setLoading(false);
    }
  };

  // Trigger download when feedbackData updates after copying
  useEffect(() => {
    if (shouldDownload && feedbackData && feedbackData.length > 0) {
      performDownload();
      setShouldDownload(false);
    }
  }, [feedbackData, shouldDownload]);

  const downloadCSV = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // If data already exists, download immediately
      if (feedbackData && feedbackData.length > 0) {
        performDownload();
        return;
      }

      // Otherwise, copy stories and wait for useEffect to trigger download
      const result = await copyStories();
      console.log("Copy result:", result);

      // Set flag to trigger download when data arrives
      setShouldDownload(true);

      // Safety timeout in case data never arrives
      setTimeout(() => {
        if (shouldDownload) {
          alert("Data is taking longer than expected. Please try again.");
          setShouldDownload(false);
          setLoading(false);
        }
      }, 5000);
    } catch (err) {
      console.error("Error downloading CSV:", err);
      alert("Failed to download CSV. See console for details.");
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <MainContent>
        <LogoWrapper>
          <Logo src="/Header-Logo.png" alt="IAMCOLLECTIVE Logo" />
        </LogoWrapper>

        <DividerWrapper>
          <Line />
          <DividerText>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={downloadCSV}
                disabled={loading || uploading}
                style={{
                  padding: "10px 14px",
                  background: loading || uploading ? "#888" : "black",
                  color: "white",
                  borderRadius: "8px",
                  cursor: loading || uploading ? "not-allowed" : "pointer",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {loading
                  ? "Processing..."
                  : feedbackData === undefined
                  ? "Loading..."
                  : `Download Feedback CSV (${feedbackData.length})`}
              </button>

              <label
                style={{
                  padding: "10px 14px",
                  background: loading || uploading ? "#888" : "#0066cc",
                  color: "white",
                  borderRadius: "8px",
                  cursor: loading || uploading ? "not-allowed" : "pointer",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "inline-block",
                }}
              >
                {uploading ? "Uploading..." : "Upload Edited CSV"}
                {/* <input
                  type="file"
                  accept=".csv"
                  onChange={handleUploadCSV}
                  disabled={loading || uploading}
                  style={{ display: "none" }}
                /> */}
              </label>
            </div>
          </DividerText>
          <Line />
        </DividerWrapper>

        <PinkButton onClick={() => navigate("/continue")}>Next</PinkButton>
      </MainContent>

      <Footer>
        <FooterText>I AM Collective is powered by</FooterText>
        <FooterLogos>
          <FooterLogo src="/MTN-Logo.png" alt="MTN-Logo" />
          <LogoDivider />
          <FooterLogo src="/chenosis.png" alt="chenosis" />
        </FooterLogos>
      </Footer>
    </ScreenContainer>
  );
}