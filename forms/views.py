from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from forms.models import ParticipationConsent, CashReceipt
from lab.models import LabProgress
import json

from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.colors import black
from django.contrib.staticfiles.storage import staticfiles_storage
# from django.templatetags.static import static
import io
import base64
# from django.core.files.images import ImageFile
# from django.core.files.base import ContentFile
# import re
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
# from reportlab.lib import colors
# from reportlab.lib.pagesizes import letter
# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.graphics.shapes import Drawing
# from reportlab.graphics import renderPDF, renderPM
# import struct
# import requests
# from PIL import Image as Image2
# import urllib.request as urllib
# Create your views here.

# def decode_base64_file(data):
#
#     def get_file_extension(file_name, decoded_file):
#         import imghdr
#         extension = imghdr.what(file_name, decoded_file)
#         extension = "jpg" if extension == "jpeg" else extension
#         return extension
#     from django.core.files.base import ContentFile
#     import base64
#     import six
#     import uuid
#     # Check if this is a base64 string
#     if isinstance(data, six.string_types):
#         # Check if the base64 string is in the "data:" format
#         if 'data:' in data and ';base64,' in data:
#             # Break out the header from the base64 content
#             header, data = data.split(';base64,')
#         # Try to decode the file. Return validation error if it fails.
#         try:
#             decoded_file = base64.b64decode(data)
#         except TypeError:
#             TypeError('invalid_image')
#
#         # Generate file name:
#         file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
#         # Get the file name extension:
#         file_extension = get_file_extension(file_name, decoded_file)
#
#         complete_file_name = "%s.%s" % (file_name, file_extension, )
#
#         return ImageFile(decoded_file, name=complete_file_name)
#
# def decode_base64(data, altchars=b'+/'):
#     """Decode base64, padding being optional.
#
#     :param data: Base64 data as an ASCII byte string
#     :returns: The decoded byte string.
#
#     """
#     data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
#     missing_padding = len(data) % 4
#     if missing_padding:
#         data += b'='* (4 - missing_padding)
#     return base64.b64decode(data, altchars)

class ConsentFormRetrieve(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):

        session = request.GET.get('session', '')
        if LabProgress.objects.filter(session=session).exists():
            lab_session = LabProgress.objects.get(session=session)
            if ParticipationConsent.objects.filter(lab_session=lab_session).exists():
                consented = True
                print('has consented')
            else:
                consented = False
                print('has not consented')

            return Response(consented, status=status.HTTP_200_OK)

# def CashReceiptPdf(request):
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = 'attachment; filename="CashReceipts.pdf"'
#     buffer = io.BytesIO()
#
#     code_num = request.GET['code']
#     consent_forms = CashReceipt.objects.filter(lab_code=code_num)
#
#     for f in consent_forms:
#         doc = SimpleDocTemplate(buffer,pagesize=letter,rightMargin=20, leftMargin=20,
#                 topMargin=20, bottomMargin=20)
#         elements = []
#         styleSheet = getSampleStyleSheet()
#
#         im = Image(staticfiles_storage.url('images/UQ-logo.jpg'), width=300,height=100)
#         im.hAlign = 'LEFT'
#         elements.append(im)
#         pay = "20"
#         name = "dubi"
#         date="augy"
#
#         elements.append(Paragraph("Cash Receipt",styleSheet['Title']))
#         elements.append(Paragraph("Payment: $" +str(pay),styleSheet['BodyText']))
#         elements.append(Paragraph("Name: " +str(name),styleSheet['BodyText']))
#         elements.append(Paragraph("Date: " +str(date),styleSheet['BodyText']))
#         elements.append(Paragraph("Signature: ",styleSheet['BodyText']))
#         # image_base64 = f.signature.split('base64,', 1 )
#         # b1 = f.signature
#         # print(b1)
#
#         # print(g)
#         # elements.append(Paragraph('<img src="'+ f.signature.split('base64,', 1 )[1] +'"></img>',styleSheet['BodyText']))
#         # file = requests.get("https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.jpeg")
#         # img = Image2.open(io.BytesIO(file.content))
#         byteImgIO = io.BytesIO()
#         byteImg = Image2.open("https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.jpeg")
#         byteImg.save(byteImgIO, "PNG")
#         byteImgIO.seek(0)
#         byteImg = byteImgIO.read()
#         # im = requests.get("https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.jpeg")
#         # im = Image('https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.jpeg', width=300,height=100)
#         elements.append(byteImg)
#         # elements.append(Paragraph("<img src='https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.jpeg'></img>",styleSheet['BodyText']))
#         # elements.append(Image("https://s3-ap-southeast-2.amazonaws.com/uqexperiment.com/download.svg", width=300,height=100))
#
#         doc.build(elements)
#     pdf = buffer.getvalue()
#     buffer.close()
#     response.write(pdf)
#     return response

    # for f in consent_forms:
    #     p.setFont(psfontname="Helvetica" ,size=25)
    #     p.drawInlineImage(staticfiles_storage.url('images/UQ-logo.jpg'),0,740, width=300,height=100)
    #     p.drawCentredString(300, 700, 'Cash Receipt form')
    #     p.setFont(psfontname="Helvetica" ,size=15)
    #     p.drawString(20, 275, 'Payment Amount: $' + str(f.amount))
    #     p.drawString(20, 250, 'First Name: ' + str(f.name))
    #     # print(type(f.signature))
    #
    #     image_base64 = f.signature.split('base64,', 1 )
    #     # image_base64 = base64.b64decode(f.signature)
    #     # image_base64 = decode_base64(f.signature.encode('ascii'))
    #     # decoded_img = decode_base64(f.signature.encode('ascii'))
    #     # print(decoded_img)
    #     # print(type(decoded_img))
    #     # img_string = io.StringIO(image_base64[1])
    #     # img_string.seek(0)
    #
    #     # signature = ContentFile((image_base64[1]).encode('ascii'))
    #     # b1 = f.signature+"="
    #     # b2 = base64.b64decode(b1)
    #     # print(b2)
    #     # b3 = io.StringIO(b2)
    #     format, imgstr = f.signature.split(';base64,')
    #     ext = format.split('/')[-1]
    #
    #     data = ContentFile(base64.b64decode(imgstr+"="), name='temp.' + ext)
    #     p.drawInlineImage(data,20,250, width=300,height=100)
    #     p.drawString(20, 225, 'Experiment Code: ' + str(f.lab_code))
    #     p.drawString(20, 200, 'Date: ' + str((f.date).strftime("%Y-%m-%d %H:%M:%S")))
    #     form.checkbox(name='cb1', tooltip='Field cb1', checked=True, fieldFlags="readOnly",
    #                   x=305, y=245, buttonStyle='check',
    #                   borderColor=black,
    #                   textColor=black, forceBorder=True)
    #     p.showPage()
    # p.save()
    # pdf = buffer.getvalue()
    # buffer.close()
    # response.write(pdf)
    # return response


def ConsentsPdf(request):
    if(request.user.is_authenticated):
            code_num = request.GET['code']
            consent_forms = ParticipationConsent.objects.filter(lab_code=code_num)

            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="consentforms.pdf"'
            buffer = io.BytesIO()
            p = canvas.Canvas(buffer)
            form = p.acroForm

            for f in consent_forms:
                p.setFont(psfontname="Helvetica" ,size=25)
                # p.drawInlineImage(staticfiles_storage.url('images/UQ-logo.jpg'),0,740, width=300,height=100)
                p.drawCentredString(300, 750, 'University of Queensland - School of Economics')
                p.drawCentredString(300, 700, 'Experiment consent form')
                p.setFont(psfontname="Helvetica" ,size=14)
                p.drawString(30, 650, '1. I have read this experiment instruction sheet and by filling this form I give my')
                p.drawString(30, 625, 'consent to participate in this economics experiment.')
                p.drawString(30, 580, '2. I acknowledge that:')
                p.setFont(psfontname="Helvetica" ,size=12)
                p.drawString(40, 550, 'a) Participation is voluntary and I may withdraw from the experiment at any time')
                p.drawString(40, 525, 'with no penalty. If I choose to withdraw prior to the completion of the experiment I ')
                p.drawString(40, 500, 'will forgo further earnings except the $5 show up fee.')
                p.drawString(40, 460, "b) Data collected during this experiment is saved anonymously and any")
                p.drawString(40, 435, "further use involves de-identified data, in which I can't be personally identified.")
                p.drawString(40, 395, "c) For purposes of the consent form and payment receipt, I need to provide my ")
                p.drawString(40, 370, "name and signature where required. The information I provide in these forms is ")
                p.drawString(40, 345, "not linked to the rest of the experiment and is saved separatly.")
                p.setFont(psfontname="Helvetica" ,size=19)
                p.drawString(30, 300, 'Participant Information:')
                p.setFont(psfontname="Helvetica" ,size=15)
                p.drawString(40, 275, 'First Name: ' + str(f.name))
                p.drawString(40, 250, 'I consent to participate in this experiment:')
                p.drawString(40, 225, 'Experiment Code: ' + str(f.lab_code))
                p.drawString(40, 200, 'Date: ' + str((f.date).strftime("%Y-%m-%d %H:%M:%S")))
                form.checkbox(name='cb1', tooltip='Field cb1', checked=True, fieldFlags="readOnly",
                              x=320, y=245, buttonStyle='check',
                              borderColor=black,
                              textColor=black, forceBorder=True)
                p.showPage()
            p.save()
            pdf = buffer.getvalue()
            buffer.close()
            response.write(pdf)
            return response

def CashReceiptPdf(request):
    if(request.user.is_authenticated):
            code_num = request.GET['code']
            receipt_forms = CashReceipt.objects.filter(lab_code=code_num)
            payment_sum = CashReceipt.pay_sum(receipt_forms)
            participant_count = receipt_forms.count()

            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="cashreceipts.pdf"'
            buffer = io.BytesIO()
            p = canvas.Canvas(buffer)
            form = p.acroForm

            p.setFont(psfontname="Helvetica" ,size=25)
            # p.drawInlineImage(staticfiles_storage.url('images/UQ-logo.jpg'),0,700, width=300,height=100)
            p.drawCentredString(300, 750, 'University of Queensland - School of Economics')
            p.drawCentredString(300, 650, 'Experiment Cash Receipt')
            p.setFont(psfontname="Helvetica" ,size=16)
            p.drawString(30, 600, 'Title of Project: The Effects of Different Learning Methods on Outcomes')
            p.drawString(30, 575, 'Name of Researchers:')
            p.setFont(psfontname="Helvetica" ,size=14)
            p.drawString(40, 550, 'Bernardo Gonzalez Arechiga, School of Economics, University of Queensland')
            p.drawString(40, 525, 'Dr. Kenan Kalayci, School of Economics, University of Queensland')
            p.drawString(40, 500, 'Dr. Rigissa Megalokonomou, School of Economics, University of Queensland')
            p.setFont(psfontname="Helvetica" ,size=19)
            p.drawString(30, 325, 'In this document:')
            p.setFont(psfontname="Helvetica" ,size=16)
            p.drawString(40, 300, 'Participant Count: ' + str(participant_count))
            p.drawString(40, 275, 'Total Payment Amount: $' + str(payment_sum['amount__sum']))
            p.showPage()

            for f in receipt_forms:
                p.setFont(psfontname="Helvetica" ,size=25)
                # p.drawInlineImage(staticfiles_storage.url('images/UQ-logo.jpg'),0,700, width=300,height=100)
                p.drawCentredString(300, 750, 'University of Queensland - School of Economics')
                p.drawCentredString(300, 650, 'Experiment Cash Receipt')
                p.setFont(psfontname="Helvetica" ,size=16)
                p.drawString(30, 600, 'Title of Project: The Effects of Different Learning Methods on Outcomes')
                p.drawString(30, 575, 'Name of Researchers:')
                p.setFont(psfontname="Helvetica" ,size=14)
                p.drawString(40, 550, 'Bernardo Gonzalez Arechiga, School of Economics, University of Queensland')
                p.drawString(40, 525, 'Dr. Kenan Kalayci, School of Economics, University of Queensland')
                p.drawString(40, 500, 'Dr. Rigissa Megalokonomou, School of Economics, University of Queensland')
                p.setFont(psfontname="Helvetica" ,size=19)
                p.drawString(30, 325, 'Participant Information:')
                p.setFont(psfontname="Helvetica" ,size=16)
                p.drawString(40, 300, 'First Name: ' + str(f.name))
                p.drawString(40, 275, 'Payment Amount: $' + str(f.amount))
                p.drawString(40, 250, 'I have received my payment:')
                p.drawString(40, 225, 'Experiment Code: ' + str(f.lab_code))
                p.drawString(40, 200, 'Date: ' + str((f.date).strftime("%Y-%m-%d %H:%M:%S")))
                form.checkbox(name='cb1', tooltip='Field cb1', checked=True, fieldFlags="readOnly",
                              x=275, y=245, buttonStyle='check',
                              borderColor=black,
                              textColor=black, forceBorder=True)
                p.showPage()
            p.save()
            pdf = buffer.getvalue()
            buffer.close()
            response.write(pdf)
            return response
