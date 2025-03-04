document.addEventListener('DOMContentLoaded', function() {
  console.log('Banasthali Arogya Seva Dashboard Initialized');
  
  // Highlight the active navigation item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Settings page tab navigation
  const settingsTabs = document.querySelectorAll('.settings-nav-item');
  const settingsPanels = document.querySelectorAll('.settings-panel');
  
  if (settingsTabs.length > 0) {
    settingsTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        
        // Update active tab
        settingsTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show target panel
        settingsPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === target) {
            panel.classList.add('active');
          }
        });
      });
    });
  }
  
  // OTP functionality for reports page
  const sendOtpBtn = document.getElementById('send-otp-btn');
  const verifyOtpBtn = document.getElementById('verify-otp-btn');
  const otpSection = document.getElementById('otp-section');
  const reportPreview = document.getElementById('report-preview');
  const otpInputs = document.querySelectorAll('.otp-input');
  
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', function() {
      const patientId = document.getElementById('patient-id').value;
      const patientPhone = document.getElementById('patient-phone').value;
      
      if (patientId && patientPhone) {
        // Show OTP section
        otpSection.classList.remove('hidden');
        
        // Focus on first OTP input
        if (otpInputs.length > 0) {
          otpInputs[0].focus();
        }
        
        // Start OTP timer
        startOtpTimer();
        
        // Simulate OTP sent
        alert('OTP sent to ' + patientPhone);
      } else {
        alert('Please enter both Patient ID and Phone Number');
      }
    });
  }
  
  if (otpInputs.length > 0) {
    // Handle OTP input behavior
    otpInputs.forEach((input, index) => {
      input.addEventListener('keyup', function(e) {
        // Move to next input on keyup if current is filled
        if (this.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
          if (index > 0 && this.value.length === 0) {
            otpInputs[index - 1].focus();
          }
        }
      });
    });
  }
  
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', function() {
      let otp = '';
      otpInputs.forEach(input => {
        otp += input.value;
      });
      
      if (otp.length === 6) {
        // For demo purposes, any 6-digit OTP works
        reportPreview.classList.remove('hidden');
        
        // Populate report with patient ID
        const patientId = document.getElementById('patient-id').value;
        if (patientId) {
          document.getElementById('preview-patient-id').textContent = patientId;
        }
      } else {
        alert('Please enter a valid 6-digit OTP');
      }
    });
  }
  
  // Print report functionality
  const printReportBtn = document.getElementById('print-report');
  if (printReportBtn) {
    printReportBtn.addEventListener('click', function() {
      window.print();
    });
  }
  
  // Download report functionality
  const downloadReportBtn = document.getElementById('download-report');
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', function() {
      alert('Report download started');
      // In a real app, this would trigger a PDF download
    });
  }
  
  // Recent reports view functionality
  const reportItemActions = document.querySelectorAll('.report-item-action');
  if (reportItemActions.length > 0) {
    reportItemActions.forEach(btn => {
      btn.addEventListener('click', function() {
        reportPreview.classList.remove('hidden');
        // In a real app, this would load the specific report data
      });
    });
  }
});

// OTP Timer function
function startOtpTimer() {
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;
  
  let timeLeft = 300; // 5 minutes in seconds
  
  const timer = setInterval(function() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Add leading zero to seconds if needed
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timerElement.textContent = minutes + ':' + seconds;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerElement.textContent = 'Expired';
      
      // In a real app, disable verification and show resend option
    }
    
    timeLeft--;
  }, 1000);
}