document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("mLaI7QQMtVOr57dpk"); // ضع هنا User ID من EmailJS

  const form = document.getElementById("visitForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const emailTemplate = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f9; font-family:'Cairo', Arial, sans-serif; padding:30px;">
        <tr>
          <td>
            <table width="600" align="center" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px;">
              <tr>
                <td style="background-color:#007bff; color:#ffffff; text-align:center; padding:20px;">
                  <h2 style="margin:0;">📝 تقرير زيارة عميل</h2>
                </td>
              </tr>
              <tr>
                <td style="padding:20px;">
                  <table width="100%" cellpadding="8" cellspacing="0" style="font-size:15px;">
                    <tr><td><strong>اسم الشركة:</strong></td><td>${
                      data.company
                    }</td></tr>
                    <tr><td><strong>الشخص المعني:</strong></td><td>${
                      data.person
                    }</td></tr>
                    <tr><td><strong>رقم الهاتف:</strong></td><td>${
                      data.phone
                    }</td></tr>
                    <tr><td><strong>نوع الزيارة:</strong></td><td>${
                      data.visitType
                    }</td></tr>
                    <tr><td><strong>التاريخ والوقت:</strong></td><td>${
                      data.datetime
                    }</td></tr>
                    <tr><td><strong>اسم المندوب:</strong></td><td>${
                      data.representative
                    }</td></tr>
                    <tr><td><strong>الوظيفة:</strong></td><td>${
                      data.position
                    }</td></tr>
                    <tr><td><strong>الهدف من الزيارة:</strong></td><td>${
                      data.goal
                    }</td></tr>
                    <tr><td><strong>التصنيف:</strong></td><td>${
                      data.category
                    }</td></tr>
                    <tr><td><strong>الملخص:</strong></td><td>${
                      data.summary
                    }</td></tr>
                    <tr><td><strong>خطة العمل:</strong></td><td>${
                      data.plan
                    }</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f0f0f0; color:#777; text-align:center; padding:10px; font-size:13px;">
                  تم الإرسال بواسطة <strong>${
                    data.representative
                  }</strong> بتاريخ ${new Date().toLocaleString("ar-EG")}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;

    // إرسال الإيميل عبر EmailJS
    emailjs
      .send("service_dhy8c1d", "template_xm4dqd9", {
        message_html: emailTemplate,
      })
      .then(
        () => {
          saveFormLocally(formData);
          document.getElementById("statusMsg").textContent =
            "✅ تم إرسال الاستمارة بنجاح!";
          form.reset();
        },
        (error) => {
          document.getElementById("statusMsg").textContent =
            "❌ حدث خطأ أثناء الإرسال!";
          console.error(error);
        }
      );
  });
});

// تحويل الاستمارة إلى PDF
function downloadAsPDF(formData) {
  const container = document.createElement("div");
  container.innerHTML = `
    <h3>استمارة زيارة الزبائن</h3>
    <p><strong>الشركة:</strong> ${formData.get("company")}</p>
    <p><strong>الشخص:</strong> ${formData.get("person")}</p>
    <p><strong>الهاتف:</strong> ${formData.get("phone")}</p>
    <p><strong>نوع الزيارة:</strong> ${formData.get("visitType")}</p>
    <p><strong>الوقت:</strong> ${formData.get("datetime")}</p>
    <p><strong>المندوب:</strong> ${formData.get(
      "representative"
    )} - ${formData.get("position")}</p>
    <p><strong>الهدف:</strong> ${formData.get("goal")}</p>
    <p><strong>التصنيف:</strong> ${formData.get("category")}</p>
    <p><strong>الملخص:</strong> ${formData.get("summary")}</p>
    <p><strong>الخطة:</strong> ${formData.get("plan")}</p>
  `;
  html2pdf().from(container).save("زيارة.pdf");
}

// 🧠 حفظ البيانات في Local Storage
function saveFormLocally(formData) {
  const savedForms = JSON.parse(localStorage.getItem("visits") || "[]");

  const entry = {};
  formData.forEach((value, key) => {
    entry[key] = value;
  });

  savedForms.push(entry);
  localStorage.setItem("visits", JSON.stringify(savedForms));
}
