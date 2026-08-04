// // // import { useState, type ReactElement } from "react";
// // // import "./App.css";


// // // interface PredictResult {
// // //   disease: string;
// // //   confidence: number;
// // //   severity: string;
// // //   heatmap_image_base64: string;
// // // }
// // // const API_URL = "https://coconut-disease-detection-1.onrender.com";
// // // function parseSeverity(severity: string) {
// // //   const percentMatch = severity.match(/(\d+(\.\d+)?)%/);
// // //   if (percentMatch) {
// // //     return { type: "percent" as const, value: parseFloat(percentMatch[1]) };
// // //   }
// // //   return { type: "stage" as const, value: severity };
// // // }

// // // function parseRecommendation(text: string) {
// // //   const isFallback = text.includes("AI service is currently unavailable");
// // //   const blocks = text.split(/\n(?=##\s+)/).map((block) => {
// // //     const match = block.match(/^##\s+(.+)\n([\s\S]*)/);
// // //     if (match) return { heading: match[1].trim(), content: match[2].trim() };
// // //     return { heading: "", content: block.trim() };
// // //   }).filter((b) => b.content || b.heading);

// // //   return { isFallback, sections: blocks };
// // // }

// // // function renderInline(text: string) {
// // //   const parts = text.split(/(\*\*[^*]+\*\*)/g);
// // //   return parts.map((part, i) =>
// // //     part.startsWith("**") && part.endsWith("**") ? (
// // //       <strong key={i}>{part.slice(2, -2)}</strong>
// // //     ) : (
// // //       <span key={i}>{part}</span>
// // //     )
// // //   );
// // // }

// // // function renderContent(content: string) {
// // //   const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
// // //   // const elements: JSX.Element[] = [];
// // //   const elements: ReactElement[] = [];
// // //   let currentList: string[] = [];
// // //   let listType: "ul" | "ol" | null = null;

// // //   const flushList = () => {
// // //     if (currentList.length && listType) {
// // //       const Tag = listType;
// // //       elements.push(
// // //         <Tag key={`list-${elements.length}`}>
// // //           {currentList.map((item, idx) => (
// // //             <li key={idx}>{renderInline(item)}</li>
// // //           ))}
// // //         </Tag>
// // //       );
// // //     }
// // //     currentList = [];
// // //     listType = null;
// // //   };

// // //   lines.forEach((line) => {
// // //     const bulletMatch = line.match(/^[*-]\s+(.*)/);
// // //     const numberMatch = line.match(/^\d+\.\s+(.*)/);

// // //     if (bulletMatch) {
// // //       if (listType !== "ul") flushList();
// // //       listType = "ul";
// // //       currentList.push(bulletMatch[1]);
// // //     } else if (numberMatch) {
// // //       if (listType !== "ol") flushList();
// // //       listType = "ol";
// // //       currentList.push(numberMatch[1]);
// // //     } else {
// // //       flushList();
// // //       elements.push(<p key={`p-${elements.length}`}>{renderInline(line)}</p>);
// // //     }
// // //   });
// // //   flushList();

// // //   return elements;
// // // }

// // // function App() {
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [result, setResult] = useState<PredictResult | null>(null);
// // //   const [recommendation, setRecommendation] = useState<string | null>(null);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       setSelectedFile(file);
// // //       setPreviewUrl(URL.createObjectURL(file));
// // //       setResult(null);
// // //       setRecommendation(null);
// // //       setError(null);
// // //     }
// // //   };

// // //   const handleAnalyze = async () => {
// // //     if (!selectedFile) return;

// // //     setLoading(true);
// // //     setError(null);
// // //     setResult(null);
// // //     setRecommendation(null);

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("file", selectedFile);

// // //       const predictRes = await fetch(`${API_URL}/predict`, {
// // //         method: "POST",
// // //         body: formData,
// // //       });
// // //       if (!predictRes.ok) throw new Error("Prediction request failed");
// // //       const predictData: PredictResult = await predictRes.json();
// // //       setResult(predictData);

// // //       const recommendRes = await fetch(`${API_URL}/recommend`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           disease: predictData.disease,
// // //           severity: predictData.severity,
// // //         }),
// // //       });
// // //       if (!recommendRes.ok) throw new Error("Recommendation request failed");
// // //       const recommendData = await recommendRes.json();
// // //       setRecommendation(recommendData.recommendation);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Something went wrong");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const stages = ["Early stage", "Moderate stage", "Advanced stage"];
// // //   const sevInfo = result ? parseSeverity(result.severity) : null;
// // //   const recInfo = recommendation ? parseRecommendation(recommendation) : null;

// // //   return (
// // //     <div className="app-shell">
// // //       <header className="masthead">
// // //         <h1>Coconut Leaf Clinic</h1>
// // //         <span className="tagline">AI diagnosis · WCLWD &amp; CCI</span>
// // //       </header>

// // //       <div className="workspace">
// // //         {/* ---------- Specimen column ---------- */}
// // //         <div className="specimen-col">
// // //           <span className="eyebrow">Specimen Slide</span>

// // //           <div className="slide">
// // //             <span className="corner-tl" />
// // //             <span className="corner-br" />
// // //             {previewUrl ? (
// // //               <img src={previewUrl} alt="Uploaded leaf specimen" />
// // //             ) : (
// // //               <p className="placeholder">
// // //                 No specimen loaded.
// // //                 <br />
// // //                 Select a leaf image to begin.
// // //               </p>
// // //             )}
// // //             {loading && <div className="scan-line" />}
// // //           </div>

// // //           <label className="file-label">
// // //             {selectedFile ? "Change image" : "Select specimen image"}
// // //             <input type="file" accept="image/*" onChange={handleFileChange} />
// // //           </label>

// // //           <button className="run-btn" onClick={handleAnalyze} disabled={!selectedFile || loading}>
// // //             {loading ? "Analyzing…" : "Run Diagnosis"}
// // //           </button>

// // //           {error && <p className="error-note">{error}</p>}
// // //         </div>

// // //         {/* ---------- Report column ---------- */}
// // //         <div className="report-col">
// // //           {!result && !loading && (
// // //             <div className="empty-report">
// // //               Awaiting specimen — results will appear here once analysis runs.
// // //             </div>
// // //           )}

// // //           {result && (
// // //             <>
// // //               <div className="card">
// // //                 <span className="eyebrow">Diagnosis</span>
// // //                 <h2>{result.disease.replace(/_/g, " ")}</h2>
// // //                 <div className="readout-row">
// // //                   <span>Confidence</span>
// // //                   <span>{(result.confidence * 100).toFixed(1)}%</span>
// // //                 </div>
// // //                 <div className="bar-track">
// // //                   <div
// // //                     className="bar-fill confidence"
// // //                     style={{ width: `${result.confidence * 100}%` }}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="card">
// // //                 <span className="eyebrow">Severity</span>

// // //                 {result.disease === "Healthy_Leaves" ? (
// // //                   <div className="healthy-badge">No disease detected</div>
// // //                 ) : sevInfo?.type === "percent" ? (
// // //                   <>
// // //                     <div className="readout-row">
// // //                       <span>Leaf damage</span>
// // //                       <span>{sevInfo.value}%</span>
// // //                     </div>
// // //                     <div className="bar-track">
// // //                       <div
// // //                         className={`bar-fill ${
// // //                           sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
// // //                         }`}
// // //                         style={{ width: `${Math.min(sevInfo.value, 100)}%` }}
// // //                       />
// // //                     </div>
// // //                   </>
// // //                 ) : (
// // //                   <div className="stage-ladder">
// // //                     {stages.map((s) => (
// // //                       <div
// // //                         key={s}
// // //                         className={`stage-step ${
// // //                           s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
// // //                         }`}
// // //                       >
// // //                         {s.replace(" stage", "")}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div className="card">
// // //                 <span className="eyebrow">Model Attention — Grad-CAM</span>
// // //                 <div className="heatmap-frame">
// // //                   <img
// // //                     src={`data:image/png;base64,${result.heatmap_image_base64}`}
// // //                     alt="Grad-CAM heatmap"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </>
// // //           )}

// // //           {recInfo && (
// // //             <div className="card">
// // //               <span className="eyebrow">Recommendation</span>
// // //               {recInfo.isFallback && (
// // //                 <p className="fallback-flag">
// // //                   ⚠ AI service unavailable — showing stored expert guidance
// // //                 </p>
// // //               )}
// // //               {recInfo.sections.map((s, i) => (
// // //                 <div className="rec-section" key={i}>
// // //                   {s.heading && <span className="tag">{s.heading}</span>}
// // //                   {renderContent(s.content)}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import { useState, type ReactElement } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import "./App.css";

// // interface PredictResult {
// //   disease: string;
// //   confidence: number;
// //   severity: string;
// //   heatmap_image_base64: string;
// // }

// // const API_URL = "https://coconut-disease-detection-1.onrender.com";

// // function parseSeverity(severity: string) {
// //   const percentMatch = severity.match(/(\d+(\.\d+)?)%/);
// //   if (percentMatch) {
// //     return { type: "percent" as const, value: parseFloat(percentMatch[1]) };
// //   }
// //   return { type: "stage" as const, value: severity };
// // }

// // function parseRecommendation(text: string) {
// //   const isFallback = text.includes("AI service is currently unavailable");
// //   const blocks = text.split(/\n(?=##\s+)/).map((block) => {
// //     const match = block.match(/^##\s+(.+)\n([\s\S]*)/);
// //     if (match) return { heading: match[1].trim(), content: match[2].trim() };
// //     return { heading: "", content: block.trim() };
// //   }).filter((b) => b.content || b.heading);

// //   return { isFallback, sections: blocks };
// // }

// // function renderInline(text: string) {
// //   const parts = text.split(/(\*\*[^*]+\*\*)/g);
// //   return parts.map((part, i) =>
// //     part.startsWith("**") && part.endsWith("**") ? (
// //       <strong key={i}>{part.slice(2, -2)}</strong>
// //     ) : (
// //       <span key={i}>{part}</span>
// //     )
// //   );
// // }

// // function renderContent(content: string) {
// //   const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
// //   const elements: ReactElement[] = [];
// //   let currentList: string[] = [];
// //   let listType: "ul" | "ol" | null = null;

// //   const flushList = () => {
// //     if (currentList.length && listType) {
// //       const Tag = listType;
// //       elements.push(
// //         <Tag key={`list-${elements.length}`}>
// //           {currentList.map((item, idx) => (
// //             <li key={idx}>{renderInline(item)}</li>
// //           ))}
// //         </Tag>
// //       );
// //     }
// //     currentList = [];
// //     listType = null;
// //   };

// //   lines.forEach((line) => {
// //     const bulletMatch = line.match(/^[*-]\s+(.*)/);
// //     const numberMatch = line.match(/^\d+\.\s+(.*)/);

// //     if (bulletMatch) {
// //       if (listType !== "ul") flushList();
// //       listType = "ul";
// //       currentList.push(bulletMatch[1]);
// //     } else if (numberMatch) {
// //       if (listType !== "ol") flushList();
// //       listType = "ol";
// //       currentList.push(numberMatch[1]);
// //     } else {
// //       flushList();
// //       elements.push(<p key={`p-${elements.length}`}>{renderInline(line)}</p>);
// //     }
// //   });
// //   flushList();

// //   return elements;
// // }

// // function App() {
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState<PredictResult | null>(null);
// //   const [recommendation, setRecommendation] = useState<string | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setSelectedFile(file);
// //       setPreviewUrl(URL.createObjectURL(file));
// //       setResult(null);
// //       setRecommendation(null);
// //       setError(null);
// //     }
// //   };

// //   const handleAnalyze = async () => {
// //     if (!selectedFile) return;

// //     setLoading(true);
// //     setError(null);
// //     setResult(null);
// //     setRecommendation(null);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", selectedFile);

// //       const predictRes = await fetch(`${API_URL}/predict`, {
// //         method: "POST",
// //         body: formData,
// //       });
// //       if (!predictRes.ok) throw new Error("Prediction request failed");
// //       const predictData: PredictResult = await predictRes.json();
// //       setResult(predictData);

// //       const recommendRes = await fetch(`${API_URL}/recommend`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           disease: predictData.disease,
// //           severity: predictData.severity,
// //         }),
// //       });
// //       if (!recommendRes.ok) throw new Error("Recommendation request failed");
// //       const recommendData = await recommendRes.json();
// //       setRecommendation(recommendData.recommendation);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const stages = ["Early stage", "Moderate stage", "Advanced stage"];
// //   const sevInfo = result ? parseSeverity(result.severity) : null;
// //   const recInfo = recommendation ? parseRecommendation(recommendation) : null;

// //   // Floating particles animation
// //   const particles = Array.from({ length: 20 }, (_, i) => ({
// //     id: i,
// //     x: Math.random() * 100,
// //     y: Math.random() * 100,
// //     size: Math.random() * 4 + 2,
// //     duration: Math.random() * 10 + 10,
// //     delay: Math.random() * 5,
// //   }));

// //   return (
// //     <div className="app-shell">
// //       {/* Animated particles background */}
// //       <div className="particles-container">
// //         {particles.map((p) => (
// //           <motion.div
// //             key={p.id}
// //             className="particle"
// //             style={{
// //               left: `${p.x}%`,
// //               top: `${p.y}%`,
// //               width: p.size,
// //               height: p.size,
// //             }}
// //             animate={{
// //               y: [0, -30, 0],
// //               x: [0, 20, -20, 0],
// //               opacity: [0.3, 0.8, 0.3],
// //             }}
// //             transition={{
// //               duration: p.duration,
// //               repeat: Infinity,
// //               delay: p.delay,
// //               ease: "easeInOut",
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Gradient orbs */}
// //       <div className="gradient-orb orb-1" />
// //       <div className="gradient-orb orb-2" />
// //       <div className="gradient-orb orb-3" />

// //       <motion.header
// //         className="masthead"
// //         initial={{ opacity: 0, y: -30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, ease: "easeOut" }}
// //       >
// //         <motion.div
// //           className="logo-container"
// //           initial={{ opacity: 0, x: -30 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ delay: 0.2, duration: 0.6 }}
// //         >
// //           <div className="logo-icon">
// //             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
// //               <path d="M12 2L2 7l10 5 10-5-10-5z" />
// //               <path d="M2 17l10 5 10-5" />
// //               <path d="M2 12l10 5 10-5" />
// //               <path d="M12 22V12" />
// //             </svg>
// //           </div>
// //           <div>
// //             <h1>Coconut Leaf Clinic</h1>
// //             <span className="tagline">AI-Powered Plant Health Diagnosis</span>
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           className="header-actions"
// //           initial={{ opacity: 0, x: 30 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ delay: 0.3, duration: 0.6 }}
// //         >
// //           <div className="status-indicator">
// //             <span className="status-dot" />
// //             <span className="status-text">System Online</span>
// //           </div>
// //           <div className="version-badge">v2.0</div>
// //         </motion.div>
// //       </motion.header>

// //       <div className="workspace">
// //         {/* Specimen column */}
// //         <motion.div
// //           className="specimen-col"
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8, delay: 0.2 }}
// //         >
// //           <motion.div
// //             className="section-header"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.4 }}
// //           >
// //             <span className="section-number">01</span>
// //             <span className="section-title">Specimen Analysis</span>
// //           </motion.div>

// //           <motion.div
// //             className="slide-container"
// //             whileHover={{ scale: 1.02 }}
// //             transition={{ type: "spring", stiffness: 400, damping: 25 }}
// //           >
// //             <div className="slide">
// //               <AnimatePresence mode="wait">
// //                 {previewUrl ? (
// //                   <motion.img
// //                     key="image"
// //                     src={previewUrl}
// //                     alt="Uploaded leaf specimen"
// //                     initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
// //                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
// //                     exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
// //                     transition={{ duration: 0.5 }}
// //                   />
// //                 ) : (
// //                   <motion.div
// //                     key="placeholder"
// //                     className="placeholder-content"
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                   >
// //                     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
// //                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //                       <polyline points="17 8 12 3 7 8" />
// //                       <line x1="12" y1="3" x2="12" y2="15" />
// //                     </svg>
// //                     <p>Drop your leaf image here</p>
// //                     <span>or click to browse</span>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //               {loading && (
// //                 <motion.div
// //                   className="scan-line"
// //                   initial={{ top: "0%" }}
// //                   animate={{ top: "100%" }}
// //                   transition={{
// //                     duration: 1.6,
// //                     repeat: Infinity,
// //                     ease: "linear",
// //                   }}
// //                 />
// //               )}
// //             </div>
// //           </motion.div>

// //           <motion.label
// //             className="file-label"
// //             whileHover={{ scale: 1.03 }}
// //             whileTap={{ scale: 0.97 }}
// //           >
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //               <polyline points="17 8 12 3 7 8" />
// //               <line x1="12" y1="3" x2="12" y2="15" />
// //             </svg>
// //             {selectedFile ? "Change Image" : "Upload Specimen"}
// //             <input type="file" accept="image/*" onChange={handleFileChange} />
// //           </motion.label>

// //           <motion.button
// //             className="run-btn"
// //             onClick={handleAnalyze}
// //             disabled={!selectedFile || loading}
// //             whileHover={!(!selectedFile || loading) ? { scale: 1.03 } : {}}
// //             whileTap={!(!selectedFile || loading) ? { scale: 0.97 } : {}}
// //           >
// //             {loading ? (
// //               <>
// //                 <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
// //                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4">
// //                     <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
// //                     <animate attributeName="stroke-dashoffset" from="31.4" to="0" dur="1s" repeatCount="indefinite" />
// //                   </circle>
// //                 </svg>
// //                 Analyzing Specimen
// //               </>
// //             ) : (
// //               <>
// //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
// //                   <polyline points="17 6 23 6 23 12" />
// //                 </svg>
// //                 Run Diagnosis
// //               </>
// //             )}
// //           </motion.button>

// //           <AnimatePresence>
// //             {error && (
// //               <motion.div
// //                 className="error-container"
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: -20 }}
// //               >
// //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <circle cx="12" cy="12" r="10" />
// //                   <line x1="12" y1="8" x2="12" y2="12" />
// //                   <line x1="12" y1="16" x2="12.01" y2="16" />
// //                 </svg>
// //                 <span>{error}</span>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </motion.div>

// //         {/* Report column */}
// //         <motion.div
// //           className="report-col"
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8, delay: 0.3 }}
// //         >
// //           <motion.div
// //             className="section-header"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.5 }}
// //           >
// //             <span className="section-number">02</span>
// //             <span className="section-title">Diagnostic Report</span>
// //           </motion.div>

// //           {!result && !loading && (
// //             <motion.div
// //               className="empty-state"
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
// //             >
// //               <div className="empty-state-icon">
// //                 <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
// //                   <path d="M12 2L2 7l10 5 10-5-10-5z" />
// //                   <path d="M2 17l10 5 10-5" />
// //                   <path d="M2 12l10 5 10-5" />
// //                 </svg>
// //               </div>
// //               <h3>Ready for Analysis</h3>
// //               <p>Upload a coconut leaf image and run diagnosis to see results here</p>
// //             </motion.div>
// //           )}

// //           {result && (
// //             <motion.div
// //               className="results-container"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ staggerChildren: 0.15 }}
// //             >
// //               <motion.div
// //                 className="result-card diagnosis-card"
// //                 initial={{ opacity: 0, y: 30 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ type: "spring", stiffness: 300 }}
// //               >
// //                 <div className="card-header">
// //                   <span className="card-icon">🔬</span>
// //                   <span className="card-label">Diagnosis</span>
// //                 </div>
// //                 <motion.h2
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   transition={{ delay: 0.2 }}
// //                 >
// //                   {result.disease.replace(/_/g, " ")}
// //                 </motion.h2>
// //                 <div className="confidence-section">
// //                   <div className="readout-row">
// //                     <span>Confidence Score</span>
// //                     <motion.span
// //                       className="confidence-value"
// //                       initial={{ opacity: 0, scale: 0.8 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
// //                     >
// //                       {(result.confidence * 100).toFixed(1)}%
// //                     </motion.span>
// //                   </div>
// //                   <div className="bar-track">
// //                     <motion.div
// //                       className="bar-fill confidence"
// //                       initial={{ width: 0 }}
// //                       animate={{ width: `${result.confidence * 100}%` }}
// //                       transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
// //                     />
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               <motion.div
// //                 className="result-card severity-card"
// //                 initial={{ opacity: 0, y: 30 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
// //               >
// //                 <div className="card-header">
// //                   <span className="card-icon">📊</span>
// //                   <span className="card-label">Severity Level</span>
// //                 </div>
// //                 {result.disease === "Healthy_Leaves" ? (
// //                   <motion.div
// //                     className="healthy-badge"
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ type: "spring", stiffness: 400 }}
// //                   >
// //                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <path d="M20 6L9 17l-5-5" />
// //                     </svg>
// //                     Plant is Healthy
// //                   </motion.div>
// //                 ) : sevInfo?.type === "percent" ? (
// //                   <div className="severity-percent">
// //                     <div className="readout-row">
// //                       <span>Leaf Damage</span>
// //                       <motion.span
// //                         className="severity-value"
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 0.2 }}
// //                       >
// //                         {sevInfo.value}%
// //                       </motion.span>
// //                     </div>
// //                     <div className="bar-track">
// //                       <motion.div
// //                         className={`bar-fill ${
// //                           sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
// //                         }`}
// //                         initial={{ width: 0 }}
// //                         animate={{ width: `${Math.min(sevInfo.value, 100)}%` }}
// //                         transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
// //                       />
// //                     </div>
// //                     <div className="severity-tags">
// //                       <span className={`tag ${sevInfo.value < 15 ? "low" : ""}`}>Mild</span>
// //                       <span className={`tag ${sevInfo.value >= 15 && sevInfo.value < 35 ? "mid" : ""}`}>Moderate</span>
// //                       <span className={`tag ${sevInfo.value >= 35 ? "high" : ""}`}>Severe</span>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="stage-ladder">
// //                     {stages.map((s, index) => (
// //                       <motion.div
// //                         key={s}
// //                         className={`stage-step ${
// //                           s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
// //                         }`}
// //                         initial={{ opacity: 0, y: 10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         transition={{ delay: 0.3 + index * 0.1 }}
// //                       >
// //                         {s.replace(" stage", "")}
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </motion.div>

// //               <motion.div
// //                 className="result-card heatmap-card"
// //                 initial={{ opacity: 0, y: 30 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
// //               >
// //                 <div className="card-header">
// //                   <span className="card-icon">🔥</span>
// //                   <span className="card-label">AI Attention Map</span>
// //                 </div>
// //                 <div className="heatmap-frame">
// //                   <motion.img
// //                     src={`data:image/png;base64,${result.heatmap_image_base64}`}
// //                     alt="Grad-CAM heatmap"
// //                     initial={{ opacity: 0, scale: 0.9 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ duration: 0.6, delay: 0.4 }}
// //                   />
// //                   <span className="heatmap-caption">Grad-CAM visualization</span>
// //                 </div>
// //               </motion.div>
// //             </motion.div>
// //           )}

// //           {recInfo && (
// //             <motion.div
// //               className="result-card recommendation-card"
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
// //             >
// //               <div className="card-header">
// //                 <span className="card-icon">💡</span>
// //                 <span className="card-label">Treatment Recommendation</span>
// //               </div>
// //               {recInfo.isFallback && (
// //                 <div className="fallback-flag">
// //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                     <circle cx="12" cy="12" r="10" />
// //                     <line x1="12" y1="8" x2="12" y2="12" />
// //                     <line x1="12" y1="16" x2="12.01" y2="16" />
// //                   </svg>
// //                   AI service offline — showing expert guidance
// //                 </div>
// //               )}
// //               {recInfo.sections.map((s, i) => (
// //                 <motion.div
// //                   className="rec-section"
// //                   key={i}
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: 0.5 + i * 0.1 }}
// //                 >
// //                   {s.heading && <div className="tag">{s.heading}</div>}
// //                   <div className="rec-content">{renderContent(s.content)}</div>
// //                 </motion.div>
// //               ))}
// //             </motion.div>
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import { useState, type ReactElement, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./App.css";

// interface PredictResult {
//   disease: string;
//   confidence: number;
//   severity: string;
//   heatmap_image_base64: string;
// }

// const API_URL = "https://coconut-disease-detection-1.onrender.com";

// function parseSeverity(severity: string) {
//   const percentMatch = severity.match(/(\d+(\.\d+)?)%/);
//   if (percentMatch) {
//     return { type: "percent" as const, value: parseFloat(percentMatch[1]) };
//   }
//   return { type: "stage" as const, value: severity };
// }

// function parseRecommendation(text: string) {
//   const isFallback = text.includes("AI service is currently unavailable");
//   const blocks = text.split(/\n(?=##\s+)/).map((block) => {
//     const match = block.match(/^##\s+(.+)\n([\s\S]*)/);
//     if (match) return { heading: match[1].trim(), content: match[2].trim() };
//     return { heading: "", content: block.trim() };
//   }).filter((b) => b.content || b.heading);

//   return { isFallback, sections: blocks };
// }

// function renderInline(text: string) {
//   const parts = text.split(/(\*\*[^*]+\*\*)/g);
//   return parts.map((part, i) =>
//     part.startsWith("**") && part.endsWith("**") ? (
//       <strong key={i}>{part.slice(2, -2)}</strong>
//     ) : (
//       <span key={i}>{part}</span>
//     )
//   );
// }

// function renderContent(content: string) {
//   const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
//   const elements: ReactElement[] = [];
//   let currentList: string[] = [];
//   let listType: "ul" | "ol" | null = null;

//   const flushList = () => {
//     if (currentList.length && listType) {
//       const Tag = listType;
//       elements.push(
//         <Tag key={`list-${elements.length}`}>
//           {currentList.map((item, idx) => (
//             <li key={idx}>{renderInline(item)}</li>
//           ))}
//         </Tag>
//       );
//     }
//     currentList = [];
//     listType = null;
//   };

//   lines.forEach((line) => {
//     const bulletMatch = line.match(/^[*-]\s+(.*)/);
//     const numberMatch = line.match(/^\d+\.\s+(.*)/);

//     if (bulletMatch) {
//       if (listType !== "ul") flushList();
//       listType = "ul";
//       currentList.push(bulletMatch[1]);
//     } else if (numberMatch) {
//       if (listType !== "ol") flushList();
//       listType = "ol";
//       currentList.push(numberMatch[1]);
//     } else {
//       flushList();
//       elements.push(<p key={`p-${elements.length}`}>{renderInline(line)}</p>);
//     }
//   });
//   flushList();

//   return elements;
// }

// function App() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<PredictResult | null>(null);
//   const [recommendation, setRecommendation] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [plantProgress, setPlantProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setResult(null);
//       setRecommendation(null);
//       setError(null);
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     setError(null);
//     setResult(null);
//     setRecommendation(null);
//     setPlantProgress(0);

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // Simulate plant growth
//       const progressInterval = setInterval(() => {
//         setPlantProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(progressInterval);
//             return 100;
//           }
//           return prev + 2;
//         });
//       }, 100);

//       const predictRes = await fetch(`${API_URL}/predict`, {
//         method: "POST",
//         body: formData,
//       });
//       if (!predictRes.ok) throw new Error("Prediction request failed");
//       const predictData: PredictResult = await predictRes.json();
//       setResult(predictData);

//       const recommendRes = await fetch(`${API_URL}/recommend`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           disease: predictData.disease,
//           severity: predictData.severity,
//         }),
//       });
//       if (!recommendRes.ok) throw new Error("Recommendation request failed");
//       const recommendData = await recommendRes.json();
//       setRecommendation(recommendData.recommendation);
      
//       clearInterval(progressInterval);
//       setPlantProgress(100);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setPlantProgress(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stages = ["Early stage", "Moderate stage", "Advanced stage"];
//   const sevInfo = result ? parseSeverity(result.severity) : null;
//   const recInfo = recommendation ? parseRecommendation(recommendation) : null;

//   // Floating particles animation
//   const particles = Array.from({ length: 20 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 4 + 2,
//     duration: Math.random() * 10 + 10,
//     delay: Math.random() * 5,
//   }));

//   return (
//     <div className="app-shell">
//       {/* Animated particles background */}
//       <div className="particles-container">
//         {particles.map((p) => (
//           <motion.div
//             key={p.id}
//             className="particle"
//             style={{
//               left: `${p.x}%`,
//               top: `${p.y}%`,
//               width: p.size,
//               height: p.size,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               x: [0, 20, -20, 0],
//               opacity: [0.3, 0.8, 0.3],
//             }}
//             transition={{
//               duration: p.duration,
//               repeat: Infinity,
//               delay: p.delay,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Gradient orbs */}
//       <div className="gradient-orb orb-1" />
//       <div className="gradient-orb orb-2" />
//       <div className="gradient-orb orb-3" />

//       <motion.header
//         className="masthead"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <motion.div
//           className="logo-container"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           <div className="logo-icon">
//             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M12 2L2 7l10 5 10-5-10-5z" />
//               <path d="M2 17l10 5 10-5" />
//               <path d="M2 12l10 5 10-5" />
//               <path d="M12 22V12" />
//             </svg>
//           </div>
//           <div>
//             <h1>Coconut Leaf Clinic</h1>
//             <span className="tagline">AI-Powered Plant Health Diagnosis</span>
//           </div>
//         </motion.div>

//         <motion.div
//           className="header-actions"
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <div className="status-indicator">
//             <span className="status-dot" />
//             <span className="status-text">System Online</span>
//           </div>
//           <div className="version-badge">v2.0</div>
//         </motion.div>
//       </motion.header>

//       <div className="workspace">
//         {/* Specimen column - fixed */}
//         <motion.div
//           className="specimen-col"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <motion.div
//             className="section-header"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <span className="section-number">01</span>
//             <span className="section-title">Specimen Analysis</span>
//           </motion.div>

//           <motion.div
//             className="slide-container"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 400, damping: 25 }}
//           >
//             <div className="slide">
//               <AnimatePresence mode="wait">
//                 {previewUrl ? (
//                   <motion.img
//                     key="image"
//                     src={previewUrl}
//                     alt="Uploaded leaf specimen"
//                     initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
//                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                     exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 ) : (
//                   <motion.div
//                     key="placeholder"
//                     className="placeholder-content"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                       <polyline points="17 8 12 3 7 8" />
//                       <line x1="12" y1="3" x2="12" y2="15" />
//                     </svg>
//                     <p>Drop your leaf image here</p>
//                     <span>or click to browse</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               {loading && (
//                 <motion.div
//                   className="scan-line"
//                   initial={{ top: "0%" }}
//                   animate={{ top: "100%" }}
//                   transition={{
//                     duration: 1.6,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                 />
//               )}
//             </div>
//           </motion.div>

//           <motion.label
//             className="file-label"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//               <polyline points="17 8 12 3 7 8" />
//               <line x1="12" y1="3" x2="12" y2="15" />
//             </svg>
//             {selectedFile ? "Change Image" : "Upload Specimen"}
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           </motion.label>

//           <motion.button
//             className="run-btn"
//             onClick={handleAnalyze}
//             disabled={!selectedFile || loading}
//             whileHover={!(!selectedFile || loading) ? { scale: 1.03 } : {}}
//             whileTap={!(!selectedFile || loading) ? { scale: 0.97 } : {}}
//           >
//             {loading ? (
//               <>
//                 <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
//                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4">
//                     <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
//                     <animate attributeName="stroke-dashoffset" from="31.4" to="0" dur="1s" repeatCount="indefinite" />
//                   </circle>
//                 </svg>
//                 Analyzing Specimen
//               </>
//             ) : (
//               <>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
//                   <polyline points="17 6 23 6 23 12" />
//                 </svg>
//                 Run Diagnosis
//               </>
//             )}
//           </motion.button>

//           <AnimatePresence>
//             {error && (
//               <motion.div
//                 className="error-container"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="12" y1="8" x2="12" y2="12" />
//                   <line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Report column - scrollable */}
//         <motion.div
//           className="report-col"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           <motion.div
//             className="section-header"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <span className="section-number">02</span>
//             <span className="section-title">Diagnostic Report</span>
//           </motion.div>

//           <div className="report-scroll-content">
//             {!result && !loading && (
//               <motion.div
//                 className="empty-state"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
//               >
//                 <div className="empty-state-icon">
//                   <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//                     <path d="M12 2L2 7l10 5 10-5-10-5z" />
//                     <path d="M2 17l10 5 10-5" />
//                     <path d="M2 12l10 5 10-5" />
//                   </svg>
//                 </div>
//                 <h3>Ready for Analysis</h3>
//                 <p>Upload a coconut leaf image and run diagnosis to see results here</p>
//               </motion.div>
//             )}

//             {loading && (
//               <motion.div
//                 className="loading-state"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <div className="plant-container">
//                   <div className="plant-growth">
//                     {/* Soil */}
//                     <div className="soil">
//                       <motion.div
//                         className="plant-stem"
//                         initial={{ height: 0 }}
//                         animate={{ height: Math.min(plantProgress * 0.3, 80) }}
//                         transition={{ duration: 0.2 }}
//                       />
//                       <motion.div
//                         className="plant-leaves"
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={{
//                           scale: plantProgress > 20 ? 1 : 0,
//                           opacity: plantProgress > 20 ? 1 : 0,
//                         }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <div className="leaf leaf-1" />
//                         <div className="leaf leaf-2" />
//                         <div className="leaf leaf-3" />
//                       </motion.div>
//                       <motion.div
//                         className="plant-flower"
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={{
//                           scale: plantProgress > 70 ? 1 : 0,
//                           opacity: plantProgress > 70 ? 1 : 0,
//                         }}
//                         transition={{ duration: 0.5, type: "spring" }}
//                       >
//                         <div className="flower-petal petal-1" />
//                         <div className="flower-petal petal-2" />
//                         <div className="flower-petal petal-3" />
//                         <div className="flower-petal petal-4" />
//                         <div className="flower-petal petal-5" />
//                         <div className="flower-center" />
//                       </motion.div>
//                     </div>
//                   </div>

//                   <div className="loading-progress">
//                     <div className="progress-bar">
//                       <motion.div
//                         className="progress-fill"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${Math.min(plantProgress, 100)}%` }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     </div>
//                     <div className="progress-status">
//                       <span className="plant-icon">
//                         {plantProgress < 25 ? "🌱" : plantProgress < 50 ? "🌿" : plantProgress < 75 ? "🌳" : "🌴"}
//                       </span>
//                       <span className="status-text">
//                         {plantProgress < 25 && "Analyzing leaf structure..."}
//                         {plantProgress >= 25 && plantProgress < 50 && "Detecting disease patterns..."}
//                         {plantProgress >= 50 && plantProgress < 75 && "Processing AI model..."}
//                         {plantProgress >= 75 && plantProgress < 100 && "Generating diagnosis..."}
//                         {plantProgress >= 100 && "Almost there!"}
//                       </span>
//                       <span className="progress-percent">{Math.min(plantProgress, 100)}%</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {result && (
//               <motion.div
//                 className="results-container"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ staggerChildren: 0.15 }}
//               >
//                 <motion.div
//                   className="result-card diagnosis-card"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="card-header">
//                     <span className="card-icon">🔬</span>
//                     <span className="card-label">Diagnosis</span>
//                   </div>
//                   <motion.h2
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     {result.disease.replace(/_/g, " ")}
//                   </motion.h2>
//                   <div className="confidence-section">
//                     <div className="readout-row">
//                       <span>Confidence Score</span>
//                       <motion.span
//                         className="confidence-value"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
//                       >
//                         {(result.confidence * 100).toFixed(1)}%
//                       </motion.span>
//                     </div>
//                     <div className="bar-track">
//                       <motion.div
//                         className="bar-fill confidence"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${result.confidence * 100}%` }}
//                         transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
//                       />
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="result-card severity-card"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
//                 >
//                   <div className="card-header">
//                     <span className="card-icon">📊</span>
//                     <span className="card-label">Severity Level</span>
//                   </div>
//                   {result.disease === "Healthy_Leaves" ? (
//                     <motion.div
//                       className="healthy-badge"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ type: "spring", stiffness: 400 }}
//                     >
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M20 6L9 17l-5-5" />
//                       </svg>
//                       Plant is Healthy
//                     </motion.div>
//                   ) : sevInfo?.type === "percent" ? (
//                     <div className="severity-percent">
//                       <div className="readout-row">
//                         <span>Leaf Damage</span>
//                         <motion.span
//                           className="severity-value"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.2 }}
//                         >
//                           {sevInfo.value}%
//                         </motion.span>
//                       </div>
//                       <div className="bar-track">
//                         <motion.div
//                           className={`bar-fill ${
//                             sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
//                           }`}
//                           initial={{ width: 0 }}
//                           animate={{ width: `${Math.min(sevInfo.value, 100)}%` }}
//                           transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
//                         />
//                       </div>
//                       <div className="severity-tags">
//                         <span className={`tag ${sevInfo.value < 15 ? "low" : ""}`}>Mild</span>
//                         <span className={`tag ${sevInfo.value >= 15 && sevInfo.value < 35 ? "mid" : ""}`}>Moderate</span>
//                         <span className={`tag ${sevInfo.value >= 35 ? "high" : ""}`}>Severe</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="stage-ladder">
//                       {stages.map((s, index) => (
//                         <motion.div
//                           key={s}
//                           className={`stage-step ${
//                             s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
//                           }`}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.3 + index * 0.1 }}
//                         >
//                           {s.replace(" stage", "")}
//                         </motion.div>
//                       ))}
//                     </div>
//                   )}
//                 </motion.div>

//                 <motion.div
//                   className="result-card heatmap-card"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
//                 >
//                   <div className="card-header">
//                     <span className="card-icon">🔥</span>
//                     <span className="card-label">AI Attention Map</span>
//                   </div>
//                   <div className="heatmap-frame">
//                     <motion.img
//                       src={`data:image/png;base64,${result.heatmap_image_base64}`}
//                       alt="Grad-CAM heatmap"
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.6, delay: 0.4 }}
//                     />
//                     <span className="heatmap-caption">Grad-CAM visualization</span>
//                   </div>
//                 </motion.div>

//                 {recInfo && (
//                   <motion.div
//                     className="result-card recommendation-card"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
//                   >
//                     <div className="card-header">
//                       <span className="card-icon">💡</span>
//                       <span className="card-label">Treatment Recommendation</span>
//                     </div>
//                     {recInfo.isFallback && (
//                       <div className="fallback-flag">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <circle cx="12" cy="12" r="10" />
//                           <line x1="12" y1="8" x2="12" y2="12" />
//                           <line x1="12" y1="16" x2="12.01" y2="16" />
//                         </svg>
//                         AI service offline — showing expert guidance
//                       </div>
//                     )}
//                     {recInfo.sections.map((s, i) => (
//                       <motion.div
//                         className="rec-section"
//                         key={i}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.5 + i * 0.1 }}
//                       >
//                         {s.heading && <div className="tag">{s.heading}</div>}
//                         <div className="rec-content">{renderContent(s.content)}</div>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

interface PredictResult {
  disease: string;
  confidence: number;
  severity: string;
  heatmap_image_base64: string;
}

const API_URL = "https://coconut-disease-detection-1.onrender.com";

function parseSeverity(severity: string) {
  const percentMatch = severity.match(/(\d+(\.\d+)?)%/);
  if (percentMatch) {
    return { type: "percent" as const, value: parseFloat(percentMatch[1]) };
  }
  return { type: "stage" as const, value: severity };
}

function parseRecommendation(text: string) {
  const isFallback = text.includes("AI service is currently unavailable");
  const blocks = text.split(/\n(?=##\s+)/).map((block) => {
    const match = block.match(/^##\s+(.+)\n([\s\S]*)/);
    if (match) return { heading: match[1].trim(), content: match[2].trim() };
    return { heading: "", content: block.trim() };
  }).filter((b) => b.content || b.heading);

  return { isFallback, sections: blocks };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function renderContent(content: string) {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const elements: ReactElement[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (currentList.length && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={`list-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }
    currentList = [];
    listType = null;
  };

  lines.forEach((line) => {
    const bulletMatch = line.match(/^[*-]\s+(.*)/);
    const numberMatch = line.match(/^\d+\.\s+(.*)/);

    if (bulletMatch) {
      if (listType !== "ul") flushList();
      listType = "ul";
      currentList.push(bulletMatch[1]);
    } else if (numberMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      currentList.push(numberMatch[1]);
    } else {
      flushList();
      elements.push(<p key={`p-${elements.length}`}>{renderInline(line)}</p>);
    }
  });
  flushList();

  return elements;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResult | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [plantProgress, setPlantProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setRecommendation(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setRecommendation(null);
    setPlantProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate plant growth with a more gradual increase
      const progressInterval = setInterval(() => {
        setPlantProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Slow down as it approaches 100 for smoother finish
          const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
          return Math.min(prev + increment, 100);
        });
      }, 120);

      const predictRes = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      if (!predictRes.ok) throw new Error("Prediction request failed");
      const predictData: PredictResult = await predictRes.json();
      setResult(predictData);

      const recommendRes = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disease: predictData.disease,
          severity: predictData.severity,
        }),
      });
      if (!recommendRes.ok) throw new Error("Recommendation request failed");
      const recommendData = await recommendRes.json();
      setRecommendation(recommendData.recommendation);
      
      clearInterval(progressInterval);
      setPlantProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPlantProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const stages = ["Early stage", "Moderate stage", "Advanced stage"];
  const sevInfo = result ? parseSeverity(result.severity) : null;
  const recInfo = recommendation ? parseRecommendation(recommendation) : null;

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // Calculate plant growth stages with smooth transitions
  const stemHeight = Math.min(plantProgress * 0.3, 80);
  const showLeaves = plantProgress > 20;
  const leafScale = Math.min((plantProgress - 20) / 30, 1);
  const showFlower = plantProgress > 70;
  const flowerScale = Math.min((plantProgress - 70) / 20, 1);

  return (
    <div className="app-shell">
      {/* Animated particles background */}
      <div className="particles-container">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />

      <motion.header
        className="masthead"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <div>
            <h1>Coconut Leaf Clinic</h1>
            <span className="tagline">AI-Powered Plant Health Diagnosis</span>
          </div>
        </motion.div>

        <motion.div
          className="header-actions"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">System Online</span>
          </div>
          <div className="version-badge">v2.0</div>
        </motion.div>
      </motion.header>

      <div className="workspace">
        {/* Specimen column - fixed */}
        <motion.div
          className="specimen-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="section-number">01</span>
            <span className="section-title">Specimen Analysis</span>
          </motion.div>

          <motion.div
            className="slide-container"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="slide">
              <AnimatePresence mode="wait">
                {previewUrl ? (
                  <motion.img
                    key="image"
                    src={previewUrl}
                    alt="Uploaded leaf specimen"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="placeholder-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p>Drop your leaf image here</p>
                    <span>or click to browse</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {loading && (
                <motion.div
                  className="scan-line"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </div>
          </motion.div>

          <motion.label
            className="file-label"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {selectedFile ? "Change Image" : "Upload Specimen"}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </motion.label>

          <motion.button
            className="run-btn"
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            whileHover={!(!selectedFile || loading) ? { scale: 1.03 } : {}}
            whileTap={!(!selectedFile || loading) ? { scale: 0.97 } : {}}
          >
            {loading ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" from="31.4" to="0" dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
                Analyzing Specimen
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Run Diagnosis
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.div
                className="error-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Report column - scrollable */}
        <motion.div
          className="report-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="section-number">02</span>
            <span className="section-title">Diagnostic Report</span>
          </motion.div>

          <div className="report-scroll-content">
            {!result && !loading && (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
              >
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3>Ready for Analysis</h3>
                <p>Upload a coconut leaf image and run diagnosis to see results here</p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                className="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="plant-container">
                  <div className="plant-growth">
                    {/* Soil */}
                    <div className="soil">
                      <motion.div
                        className="plant-stem"
                        initial={{ height: 0 }}
                        animate={{ height: stemHeight }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div
                        className="plant-leaves"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: showLeaves ? leafScale : 0,
                          opacity: showLeaves ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="leaf leaf-1" />
                        <div className="leaf leaf-2" />
                        <div className="leaf leaf-3" />
                      </motion.div>
                      <motion.div
                        className="plant-flower"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: showFlower ? flowerScale : 0,
                          opacity: showFlower ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <div className="flower-petal petal-1" />
                        <div className="flower-petal petal-2" />
                        <div className="flower-petal petal-3" />
                        <div className="flower-petal petal-4" />
                        <div className="flower-petal petal-5" />
                        <div className="flower-center" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="loading-progress">
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(plantProgress, 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="progress-status">
                      <span className="plant-icon">
                        {plantProgress < 25 ? "🌱" : plantProgress < 50 ? "🌿" : plantProgress < 75 ? "🌳" : "🌴"}
                      </span>
                      <span className="status-text">
                        {plantProgress < 25 && "Analyzing leaf structure..."}
                        {plantProgress >= 25 && plantProgress < 50 && "Detecting disease patterns..."}
                        {plantProgress >= 50 && plantProgress < 75 && "Processing AI model..."}
                        {plantProgress >= 75 && plantProgress < 100 && "Generating diagnosis..."}
                        {plantProgress >= 100 && "Analysis complete! 🎉"}
                      </span>
                      <span className="progress-percent">{Math.min(plantProgress, 100)}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                className="results-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.15 }}
              >
                <motion.div
                  className="result-card diagnosis-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-header">
                    <span className="card-icon">🔬</span>
                    <span className="card-label">Diagnosis</span>
                  </div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {result.disease.replace(/_/g, " ")}
                  </motion.h2>
                  <div className="confidence-section">
                    <div className="readout-row">
                      <span>Confidence Score</span>
                      <motion.span
                        className="confidence-value"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                      >
                        {(result.confidence * 100).toFixed(1)}%
                      </motion.span>
                    </div>
                    <div className="bar-track">
                      <motion.div
                        className="bar-fill confidence"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="result-card severity-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                >
                  <div className="card-header">
                    <span className="card-icon">📊</span>
                    <span className="card-label">Severity Level</span>
                  </div>
                  {result.disease === "Healthy_Leaves" ? (
                    <motion.div
                      className="healthy-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Plant is Healthy
                    </motion.div>
                  ) : sevInfo?.type === "percent" ? (
                    <div className="severity-percent">
                      <div className="readout-row">
                        <span>Leaf Damage</span>
                        <motion.span
                          className="severity-value"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {sevInfo.value}%
                        </motion.span>
                      </div>
                      <div className="bar-track">
                        <motion.div
                          className={`bar-fill ${
                            sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(sevInfo.value, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                      <div className="severity-tags">
                        <span className={`tag ${sevInfo.value < 15 ? "low" : ""}`}>Mild</span>
                        <span className={`tag ${sevInfo.value >= 15 && sevInfo.value < 35 ? "mid" : ""}`}>Moderate</span>
                        <span className={`tag ${sevInfo.value >= 35 ? "high" : ""}`}>Severe</span>
                      </div>
                    </div>
                  ) : (
                    <div className="stage-ladder">
                      {stages.map((s, index) => (
                        <motion.div
                          key={s}
                          className={`stage-step ${
                            s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {s.replace(" stage", "")}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="result-card heatmap-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                >
                  <div className="card-header">
                    <span className="card-icon">🔥</span>
                    <span className="card-label">AI Attention Map</span>
                  </div>
                  <div className="heatmap-frame">
                    <motion.img
                      src={`data:image/png;base64,${result.heatmap_image_base64}`}
                      alt="Grad-CAM heatmap"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <span className="heatmap-caption">Grad-CAM visualization</span>
                  </div>
                </motion.div>

                {recInfo && (
                  <motion.div
                    className="result-card recommendation-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <div className="card-header">
                      <span className="card-icon">💡</span>
                      <span className="card-label">Treatment Recommendation</span>
                    </div>
                    {recInfo.isFallback && (
                      <div className="fallback-flag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        AI service offline — showing expert guidance
                      </div>
                    )}
                    {recInfo.sections.map((s, i) => (
                      <motion.div
                        className="rec-section"
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {s.heading && <div className="tag">{s.heading}</div>}
                        <div className="rec-content">{renderContent(s.content)}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;