import React, { useState, useEffect } from "react";

export const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resume", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Fetch response:", data); 
          
          
          if (data && data.resumeUrl) {
            setResumeUrl(data.resumeUrl);
          } else {
            setResumeUrl(null);
          }
        } else {
          console.error("Failed to fetch resume:", response.status);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        setMessage("Failed to fetch existing resume");
      }
    };
    fetchResume();
  }, []);

  
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setMessage("⚠️ Please select a PDF or Word document.");
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      setMessage("⚠️ File size must be less than 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/resume/upload", {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}` 
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload response:", data); 

        
        if (data && data.resumeUrl) {
          setResumeUrl(data.resumeUrl);
          setMessage("✅ Resume uploaded successfully!");
          setFile(null); 
        } else {
          setMessage("❌ Upload succeeded but no URL returned.");
        }
      } else {
        const errorText = await response.text();
        setMessage(`❌ ${errorText || 'Failed to upload resume'}`);
      }
    } catch (err) {
      console.error("Error uploading resume:", err);
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setMessage(`Selected: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  };


  const getViewUrl = (resumeUrl) => {
    if (!resumeUrl) return null;
    
    
    const filename = resumeUrl.split('/').pop();
    
    
    return `/api/resume/view/${filename}`;
  };

  const handleViewResume = (resumeUrl) => {
    const viewUrl = getViewUrl(resumeUrl);
    if (!viewUrl) return;
    
    console.log("Trying to open:", viewUrl);
    
    
    const link = document.createElement('a');
    link.href = viewUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    
    handleAuthenticatedView(viewUrl);
  };

  const handleAuthenticatedView = async (viewUrl) => {
    try {
      const response = await fetch(viewUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      } else {
        setMessage("❌ Failed to load resume. Please try again.");
      }
    } catch (error) {
      console.error("Error viewing resume:", error);
      setMessage("❌ Error loading resume. Please try again.");
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/images/emp-dash.png"
      className="fixed h-full w-full object-cover blur-sm scale-105 brightness-50"
      alt="" />

      <div className=" flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="z-10 w-full max-w-md bg-white/70 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Resume Upload</h2>

        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-8clea00 mb-2">
              Select Resume (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                         file:cursor-pointer cursor-pointer disabled:opacity-50"
            />
          </div>
          
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700
                       disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
                       flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Uploading...
              </div>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>

        {message && (
          <div className={`text-sm p-3 rounded-lg mb-4 ${
            message.includes('✅') ? 'bg-green-100 text-green-700' :
            message.includes('⚠️') ? 'bg-yellow-100 text-yellow-700' :
            message.includes('❌') ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message}
          </div>
        )}

        {resumeUrl && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-gray-700 mb-3 font-medium">Current Resume:</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleViewResume(resumeUrl)}
                className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 
                           rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Resume
              </button>
              <span className="text-xs text-gray-500 text-center">
                {resumeUrl.split('/').pop()}
              </span>
            </div>
          </div>
        )}

        {!resumeUrl && !loading && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-500 text-sm">No resume uploaded yet</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

// export default ResumeUpload;