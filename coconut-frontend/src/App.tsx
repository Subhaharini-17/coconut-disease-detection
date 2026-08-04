// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from './assets/vite.svg'
// // // import heroImg from './assets/hero.png'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <section id="center">
// // //         <div className="hero">
// // //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// // //           <img src={reactLogo} className="framework" alt="React logo" />
// // //           <img src={viteLogo} className="vite" alt="Vite logo" />
// // //         </div>
// // //         <div>
// // //           <h1>Get started</h1>
// // //           <p>
// // //             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
// // //           </p>
// // //         </div>
// // //         <button
// // //           type="button"
// // //           className="counter"
// // //           onClick={() => setCount((count) => count + 1)}
// // //         >
// // //           Count is {count}
// // //         </button>
// // //       </section>

// // //       <div className="ticks"></div>

// // //       <section id="next-steps">
// // //         <div id="docs">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#documentation-icon"></use>
// // //           </svg>
// // //           <h2>Documentation</h2>
// // //           <p>Your questions, answered</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://vite.dev/" target="_blank">
// // //                 <img className="logo" src={viteLogo} alt="" />
// // //                 Explore Vite
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://react.dev/" target="_blank">
// // //                 <img className="button-icon" src={reactLogo} alt="" />
// // //                 Learn more
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //         <div id="social">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#social-icon"></use>
// // //           </svg>
// // //           <h2>Connect with us</h2>
// // //           <p>Join the Vite community</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://github.com/vitejs/vite" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#github-icon"></use>
// // //                 </svg>
// // //                 GitHub
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://chat.vite.dev/" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#discord-icon"></use>
// // //                 </svg>
// // //                 Discord
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://x.com/vite_js" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#x-icon"></use>
// // //                 </svg>
// // //                 X.com
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#bluesky-icon"></use>
// // //                 </svg>
// // //                 Bluesky
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       </section>

// // //       <div className="ticks"></div>
// // //       <section id="spacer"></section>
// // //     </>
// // //   )
// // // }

// // // export default App

// // import { useState } from "react";
// // import "./App.css";

// // interface PredictResult {
// //   disease: string;
// //   confidence: number;
// //   severity: string;
// //   heatmap_image_base64: string;
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
// //       // Step A: call /predict
// //       const formData = new FormData();
// //       formData.append("file", selectedFile);

// //       const predictRes = await fetch("http://localhost:8000/predict", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!predictRes.ok) throw new Error("Prediction request failed");

// //       const predictData: PredictResult = await predictRes.json();
// //       setResult(predictData);

// //       // Step B: call /recommend using the disease + severity we just got
// //       const recommendRes = await fetch("http://localhost:8000/recommend", {
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

// //   return (
// //     <div className="app-container">
// //       <h1>🥥 Coconut Disease Detection AI</h1>
// //       <p>Upload a coconut leaf image to detect disease, severity, and get treatment advice.</p>

// //       <input type="file" accept="image/*" onChange={handleFileChange} />

// //       {selectedFile && (
// //         <button onClick={handleAnalyze} disabled={loading}>
// //           {loading ? "Analyzing..." : "🔍 Analyze Leaf"}
// //         </button>
// //       )}

// //       {previewUrl && (
// //         <div className="preview">
// //           <h3>Uploaded Image</h3>
// //           <img src={previewUrl} alt="preview" width={300} />
// //         </div>
// //       )}

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {result && (
// //         <div className="results">
// //           <h3>🩺 Prediction Result</h3>
// //           <p><strong>Disease:</strong> {result.disease}</p>
// //           <p><strong>Severity:</strong> {result.severity}</p>
// //           <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>

// //           <h3>🔥 Grad-CAM Heatmap</h3>
// //           <img
// //             src={`data:image/png;base64,${result.heatmap_image_base64}`}
// //             alt="Grad-CAM heatmap"
// //             width={300}
// //           />
// //         </div>
// //       )}

// //       {recommendation && (
// //         <div className="recommendation">
// //           <h3>🌱 AI Recommendation</h3>
// //           <pre style={{ whiteSpace: "pre-wrap" }}>{recommendation}</pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// import { useState } from "react";
// import "./App.css";

// interface PredictResult {
//   disease: string;
//   confidence: number;
//   severity: string;
//   heatmap_image_base64: string;
// }

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

// function App() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<PredictResult | null>(null);
//   const [recommendation, setRecommendation] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

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

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const predictRes = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       if (!predictRes.ok) throw new Error("Prediction request failed");
//       const predictData: PredictResult = await predictRes.json();
//       setResult(predictData);

//       const recommendRes = await fetch("http://localhost:8000/recommend", {
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
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stages = ["Early stage", "Moderate stage", "Advanced stage"];
//   const sevInfo = result ? parseSeverity(result.severity) : null;
//   const recInfo = recommendation ? parseRecommendation(recommendation) : null;

//   return (
//     <div className="app-shell">
//       <header className="masthead">
//         <h1>Coconut Leaf Clinic</h1>
//         <span className="tagline">AI diagnosis · WCLWD &amp; CCI</span>
//       </header>

//       <div className="workspace">
//         {/* ---------- Specimen column ---------- */}
//         <div className="specimen-col">
//           <span className="eyebrow">Specimen Slide</span>

//           <div className="slide">
//             <span className="corner-tl" />
//             <span className="corner-br" />
//             {previewUrl ? (
//               <img src={previewUrl} alt="Uploaded leaf specimen" />
//             ) : (
//               <p className="placeholder">
//                 No specimen loaded.
//                 <br />
//                 Select a leaf image to begin.
//               </p>
//             )}
//             {loading && <div className="scan-line" />}
//           </div>

//           <label className="file-label">
//             {selectedFile ? "Change image" : "Select specimen image"}
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           </label>

//           <button className="run-btn" onClick={handleAnalyze} disabled={!selectedFile || loading}>
//             {loading ? "Analyzing…" : "Run Diagnosis"}
//           </button>

//           {error && <p className="error-note">{error}</p>}
//         </div>

//         {/* ---------- Report column ---------- */}
//         <div className="report-col">
//           {!result && !loading && (
//             <div className="empty-report">
//               Awaiting specimen — results will appear here once analysis runs.
//             </div>
//           )}

//           {result && (
//             <>
//               <div className="card">
//                 <span className="eyebrow">Diagnosis</span>
//                 <h2>{result.disease.replace(/_/g, " ")}</h2>
//                 <div className="readout-row">
//                   <span>Confidence</span>
//                   <span>{(result.confidence * 100).toFixed(1)}%</span>
//                 </div>
//                 <div className="bar-track">
//                   <div
//                     className="bar-fill confidence"
//                     style={{ width: `${result.confidence * 100}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="card">
//                 <span className="eyebrow">Severity</span>

//                 {result.disease === "Healthy_Leaves" ? (
//                   <div className="healthy-badge">No disease detected</div>
//                 ) : sevInfo?.type === "percent" ? (
//                   <>
//                     <div className="readout-row">
//                       <span>Leaf damage</span>
//                       <span>{sevInfo.value}%</span>
//                     </div>
//                     <div className="bar-track">
//                       <div
//                         className={`bar-fill ${
//                           sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
//                         }`}
//                         style={{ width: `${Math.min(sevInfo.value, 100)}%` }}
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <div className="stage-ladder">
//                     {stages.map((s) => (
//                       <div
//                         key={s}
//                         className={`stage-step ${
//                           s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
//                         }`}
//                       >
//                         {s.replace(" stage", "")}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="card">
//                 <span className="eyebrow">Model Attention — Grad-CAM</span>
//                 <div className="heatmap-frame">
//                   <img
//                     src={`data:image/png;base64,${result.heatmap_image_base64}`}
//                     alt="Grad-CAM heatmap"
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {recInfo && (
//             <div className="card">
//               <span className="eyebrow">Recommendation</span>
//               {recInfo.isFallback && (
//                 <p className="fallback-flag">
//                   ⚠ AI service unavailable — showing stored expert guidance
//                 </p>
//               )}
//               {recInfo.sections.map((s, i) => (
//                 <div className="rec-section" key={i}>
//                   {s.heading && <span className="tag">{s.heading}</span>}
//                   <p>{s.content}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
import { useState, type ReactElement } from "react";
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
  // const elements: JSX.Element[] = [];
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

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const stages = ["Early stage", "Moderate stage", "Advanced stage"];
  const sevInfo = result ? parseSeverity(result.severity) : null;
  const recInfo = recommendation ? parseRecommendation(recommendation) : null;

  return (
    <div className="app-shell">
      <header className="masthead">
        <h1>Coconut Leaf Clinic</h1>
        <span className="tagline">AI diagnosis · WCLWD &amp; CCI</span>
      </header>

      <div className="workspace">
        {/* ---------- Specimen column ---------- */}
        <div className="specimen-col">
          <span className="eyebrow">Specimen Slide</span>

          <div className="slide">
            <span className="corner-tl" />
            <span className="corner-br" />
            {previewUrl ? (
              <img src={previewUrl} alt="Uploaded leaf specimen" />
            ) : (
              <p className="placeholder">
                No specimen loaded.
                <br />
                Select a leaf image to begin.
              </p>
            )}
            {loading && <div className="scan-line" />}
          </div>

          <label className="file-label">
            {selectedFile ? "Change image" : "Select specimen image"}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <button className="run-btn" onClick={handleAnalyze} disabled={!selectedFile || loading}>
            {loading ? "Analyzing…" : "Run Diagnosis"}
          </button>

          {error && <p className="error-note">{error}</p>}
        </div>

        {/* ---------- Report column ---------- */}
        <div className="report-col">
          {!result && !loading && (
            <div className="empty-report">
              Awaiting specimen — results will appear here once analysis runs.
            </div>
          )}

          {result && (
            <>
              <div className="card">
                <span className="eyebrow">Diagnosis</span>
                <h2>{result.disease.replace(/_/g, " ")}</h2>
                <div className="readout-row">
                  <span>Confidence</span>
                  <span>{(result.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill confidence"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="card">
                <span className="eyebrow">Severity</span>

                {result.disease === "Healthy_Leaves" ? (
                  <div className="healthy-badge">No disease detected</div>
                ) : sevInfo?.type === "percent" ? (
                  <>
                    <div className="readout-row">
                      <span>Leaf damage</span>
                      <span>{sevInfo.value}%</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${
                          sevInfo.value < 15 ? "sev-low" : sevInfo.value < 35 ? "sev-mid" : "sev-high"
                        }`}
                        style={{ width: `${Math.min(sevInfo.value, 100)}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="stage-ladder">
                    {stages.map((s) => (
                      <div
                        key={s}
                        className={`stage-step ${
                          s === sevInfo?.value ? `active ${s === "Advanced stage" ? "advanced" : ""}` : ""
                        }`}
                      >
                        {s.replace(" stage", "")}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <span className="eyebrow">Model Attention — Grad-CAM</span>
                <div className="heatmap-frame">
                  <img
                    src={`data:image/png;base64,${result.heatmap_image_base64}`}
                    alt="Grad-CAM heatmap"
                  />
                </div>
              </div>
            </>
          )}

          {recInfo && (
            <div className="card">
              <span className="eyebrow">Recommendation</span>
              {recInfo.isFallback && (
                <p className="fallback-flag">
                  ⚠ AI service unavailable — showing stored expert guidance
                </p>
              )}
              {recInfo.sections.map((s, i) => (
                <div className="rec-section" key={i}>
                  {s.heading && <span className="tag">{s.heading}</span>}
                  {renderContent(s.content)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;