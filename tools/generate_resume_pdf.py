import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.pdfgen import canvas
from pypdf import PdfReader

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        if page_count > 1:
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#666666"))
            self.drawRightString(letter[0] - 36, 20, f"Page {self._pageNumber} of {page_count}")

def generate_pdf(output_path):
    # Margins: 36pt (0.5 in) left/right, 28pt top/bottom to guarantee 1-page fit
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    # Custom styles
    name_style = ParagraphStyle(
        'ResumeName',
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=21,
        alignment=1, # Center
        textColor=colors.HexColor("#0f172a")
    )

    contact_style = ParagraphStyle(
        'ResumeContact',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        alignment=1,
        textColor=colors.HexColor("#334155")
    )

    section_heading = ParagraphStyle(
        'ResumeSectionHeading',
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=12.5,
        textColor=colors.HexColor("#0369a1"),
        spaceAfter=2.5,
        spaceBefore=5.5
    )

    body_style = ParagraphStyle(
        'ResumeBody',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor("#1e293b")
    )

    body_bold = ParagraphStyle(
        'ResumeBodyBold',
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor("#0f172a")
    )

    bullet_style = ParagraphStyle(
        'ResumeBullet',
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.5,
        leftIndent=11,
        firstLineIndent=-7,
        textColor=colors.HexColor("#334155"),
        spaceAfter=1.2
    )

    sub_style = ParagraphStyle(
        'ResumeSub',
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10,
        textColor=colors.HexColor("#475569"),
        spaceAfter=1.5
    )

    story = []

    # 1. Header
    story.append(Paragraph("EBNUL HASAN MAHI", name_style))
    story.append(Spacer(1, 2))
    
    contacts = (
        '<a href="mailto:ebnulhasanmahi001@gmail.com"><font color="#0284c7"><u>ebnulhasanmahi001@gmail.com</u></font></a> &bull; '
        '+880 1879 450 876 &bull; '
        '<a href="https://www.linkedin.com/in/ebnul-hasan-mahi/"><font color="#0284c7"><u>linkedin.com/in/ebnul-hasan-mahi</u></font></a> &bull; '
        '<a href="https://github.com/EHMahi9"><font color="#0284c7"><u>github.com/EHMahi9</u></font></a> &bull; '
        '<a href="https://www.ebnulhasanmahi.me"><font color="#0284c7"><u>ebnulhasanmahi.me</u></font></a>'
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#cbd5e1"), spaceAfter=4, spaceBefore=0))

    # 2. Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    summary_text = (
        "Software Engineering student (CGPA: 3.67) with practical experience building responsive full-stack "
        "web applications, secure authentication workflows, and relational/document database schemas. "
        "Proficient in React, Next.js, Node.js, Express, MySQL, and WebSockets. "
        "Committed to clean architecture, reliable engineering fundamentals, and practical software design."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 1))

    # 3. Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills = [
        "<b>Languages:</b> JavaScript (ES6+), TypeScript, Java, Python, C/C++, SQL, HTML5, CSS3",
        "<b>Frontend:</b> React.js, Next.js, Tailwind CSS, Responsive Design, Web Accessibility",
        "<b>Backend & Auth:</b> Node.js, Express.js, Spring Boot, FastAPI, JWT, REST APIs, WebSockets",
        "<b>Databases:</b> MySQL, PostgreSQL, MongoDB",
        "<b>Tools & Concepts:</b> Git, GitHub, Postman, Vite, Vercel, Docker, OOP, Data Structures & Algorithms"
    ]
    for s in skills:
        story.append(Paragraph(s, bullet_style))
    story.append(Spacer(1, 1))

    # 4. Featured Projects
    story.append(Paragraph("FEATURED PROJECTS", section_heading))

    # Project 1: Dr. Md. Momenul Islam Health Assistant
    p1_title = (
        "<b>Dr. Md. Momenul Islam Health Assistant</b> | <i>React, TypeScript, FastAPI, Python, RAG</i> "
        "— <a href=\"https://www.ebnulhasanmahi.me/projects/dr-momenul-islam\"><font color=\"#0284c7\"><u>Case Study</u></font></a> | "
        "<a href=\"https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam\"><font color=\"#0284c7\"><u>GitHub</u></font></a>"
    )
    story.append(Paragraph(p1_title, body_bold))
    story.append(Paragraph("Evidence-grounded health information assistant prototype — Built in memory of Dr. Md. Momenul Islam", sub_style))
    story.append(Paragraph("&bull; Developed a multilingual health assistant interface addressing queries across English, Bangla, and Banglish.", bullet_style))
    story.append(Paragraph("&bull; Grounded clinical guidance using curated NHS sources with transparent source provenance tracking and safety disclaimers.", bullet_style))
    story.append(Paragraph("&bull; Implemented deterministic out-of-scope refusal protocols and emergency routing to avoid ungrounded generative advice.", bullet_style))
    story.append(Paragraph("&bull; Built modern web interface; retrieval pipeline runs in local high-memory environment with full triage walkthrough.", bullet_style))
    story.append(Spacer(1, 2.5))

    # Project 2: NoboGhat
    p2_title = (
        "<b>NoboGhat</b> | <i>Next.js, React, Java, Spring Boot, MySQL, JWT</i> "
        "— <a href=\"https://noboghatbangladesh.vercel.app/\"><font color=\"#0284c7\"><u>Live Demo</u></font></a> | "
        "<a href=\"https://github.com/EHMahi9/NoboGhat-Bangladesh\"><font color=\"#0284c7\"><u>GitHub</u></font></a>"
    )
    story.append(Paragraph(p2_title, body_bold))
    story.append(Paragraph("Decoupled inland waterway logistics & cargo booking platform", sub_style))
    story.append(Paragraph("&bull; Developed a responsive, accessible frontend using Next.js and Tailwind CSS with server-side rendering.", bullet_style))
    story.append(Paragraph("&bull; Engineered decoupled backend services with Java, Spring Boot, and MySQL for boat discovery and capacity-aware booking.", bullet_style))
    story.append(Paragraph("&bull; Implemented live cargo capacity tracking and role-based access control for farmers, traders, and boat operators.", bullet_style))
    story.append(Spacer(1, 2.5))

    # Project 3: HeliosTrack
    p3_title = (
        "<b>HeliosTrack</b> | <i>React, Node.js, Express, MySQL, WebSockets, Chart.js</i> "
        "— <a href=\"https://helios-track-distributed-solar-moni.vercel.app/\"><font color=\"#0284c7\"><u>Live Demo</u></font></a> | "
        "<a href=\"https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System\"><font color=\"#0284c7\"><u>GitHub</u></font></a>"
    )
    story.append(Paragraph(p3_title, body_bold))
    story.append(Paragraph("Real-time distributed solar array monitoring dashboard with sub-second telemetry", sub_style))
    story.append(Paragraph("&bull; Designed and built an enterprise telemetry dashboard featuring sub-second live telemetry streaming via WebSockets.", bullet_style))
    story.append(Paragraph("&bull; Integrated interactive Chart.js grid and virtual battery controller to visualize distributed solar array performance.", bullet_style))
    story.append(Paragraph("&bull; Connected Node.js API with Aiven Cloud MySQL database for reliable persistence and fast querying of inverter metrics.", bullet_style))
    story.append(Spacer(1, 2))

    # 5. Education & Training
    story.append(Paragraph("EDUCATION & TRAINING", section_heading))
    edu1_title = "<b>Bachelor of Science in Software Engineering</b> — Daffodil International University (DIU)"
    story.append(Paragraph(edu1_title, body_bold))
    story.append(Paragraph("Current CGPA: 3.67 | Expected Graduation: 2028", sub_style))
    story.append(Spacer(1, 1.5))

    edu2_title = "<b>Full-Stack Web Development Training</b> — Programming Hero (Batch 14, In Progress)"
    story.append(Paragraph(edu2_title, body_bold))
    story.append(Paragraph("Intensive practical training covering modern JavaScript, React, Next.js, Node.js, Express, MySQL, and Web Architecture.", sub_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    
    reader = PdfReader(output_path)
    page_count = len(reader.pages)
    file_size = os.path.getsize(output_path)
    print(f"PDF generated: {output_path}")
    print(f"Total Pages: {page_count} (Single page verified: {page_count == 1})")
    print(f"File Size: {file_size} bytes")

if __name__ == '__main__':
    out = r'D:\Code\Mahi Portfolio\public\assets\documents\resume.pdf'
    generate_pdf(out)
