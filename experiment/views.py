from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.utils import timezone
from django.http import HttpResponse
from datetime import timedelta
from django.template.loader import get_template
from django.contrib.auth import logout
from django.contrib.auth import login, authenticate, get_user_model
from django.contrib import messages
from django.contrib.messages import get_messages
from django.shortcuts import render, redirect, reverse
from django.views.generic import TemplateView
from django.contrib.auth.models import User
from datetime import datetime
from django.http import HttpResponse, FileResponse
from rest_framework.response import Response
from rest_framework import generics, status
from django.utils.safestring import mark_safe
from django import forms
import json

from django.core import serializers
from lab.models import LabCode, LabProgress
from lab.serializers import LabProgressSerializer_Metrics
from forms.models import ParticipationConsent, CashReceipt
from data.models import SurveyData
from lab.serializers import LabCodeSerializer, LabProgressSerializer
from django.views.decorators.csrf import csrf_protect
import io
from reportlab.pdfgen import canvas
from reportlab.lib.colors import black
from django.contrib.staticfiles.storage import staticfiles_storage
#
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
# import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import seaborn as sns
import statsmodels.api as sm
import urllib, base64


#Debugger
import logging
logger = logging.getLogger(__name__)


def setSession(request):
    if not "key_copy" in request.session or request.session['key_copy'] == None:
        request.session['key_copy'] = request.session.session_key

    # print(request.session['key_copy'])

def setGroup(request):
    if "key_copy" and "code" and not "group" in request.session:
        if LabProgress.objects.filter(session=request.session['key_copy']).count() == 1:
            participant = LabProgress.objects.get(session=request.session['key_copy'])
            if participant.group:
                request.session['group'] = participant.group


# Website
@csrf_protect
def home_view(request):
    if not request.session.session_key:
        request.session.create()

    setSession(request)
    setGroup(request)
    dict = {}
    if 'key_copy' in request.session:
        session = request.session['key_copy']
        if LabProgress.objects.filter(session=session).exists():
            lab = LabProgress.objects.get(session=session)
    if 'code' and 'computer' in request.session:
        dict['logged'] = True
    if request.method == 'POST':
        if 'code' and 'computer' in request.POST:
            # print('form submitted')
            code = request.POST['code']
            computer = request.POST['computer']
            if LabCode.objects.filter(code=code).count() > 0 and not computer == "":
                try:
                    computer = int(computer)
                    request.session['code'] = request.POST['code']
                    request.session['computer'] = int(computer)
                    if LabProgress.objects.filter(session=request.session['key_copy']).count() == 0 and computer:
                        labcode = LabCode.objects.get(code=code)
                        participant = LabProgress.objects.get_or_create(code=labcode, computer=computer, session=request.session['key_copy'])
                        return redirect('instructions')
                except ValueError:
                    print("Input incorrect")
                    dict['form_denied'] = True
            else:
                print('computer is none')
                dict['form_denied'] = True
    return render(request, 'home.html', dict)

def waiting_screen_view(request):

    setGroup(request)
    if request.method == 'GET':
        setGroup(request)
    if "code" in request.session or request.user.is_authenticated:
        return render(request, 'waiting_screen.html')
    else:
        return redirect('home')

def consent_view(request):
    dict = {'consent': False}
    if "code" in request.session:
        setGroup(request)
        if LabProgress.objects.filter(session=request.session['key_copy']).exists():
            lab = LabProgress.objects.get(session=request.session['key_copy'])
            if ParticipationConsent.objects.filter(lab_session=lab).exists():
                conse = ParticipationConsent.objects.get(lab_session=lab)
                dict['consent'] = conse.consent
        if request.method == 'POST':
            if 'checkbox' in request.POST:
                code = request.session['code']
                labcode = LabCode.objects.get(code=code)
                name = request.POST['name']
                session = LabProgress.objects.get(session=request.session['key_copy'])
                ParticipationConsent.objects.update_or_create(lab_session=session,lab_code=labcode,consent=True,name=name)
                if LabProgress.objects.filter(session=request.session['key_copy']).exists():
                    lab = LabProgress.objects.get(session=request.session['key_copy'])
                    lab.consent = True
                    lab.save()
                    if ParticipationConsent.objects.filter(lab_session=lab).exists():
                        conse = ParticipationConsent.objects.get(lab_session=lab)
                        dict['consent'] = conse.consent
        return render(request,'consent.html', dict)
    elif request.user.is_authenticated:
        return render(request,'consent.html', dict)
    else:
        return redirect('home')

def instructions_view(request):

    setGroup(request)
    if request.user.is_authenticated or "code" in request.session:
        return render(request,'instructions.html')
    else:
        return redirect('home')

def content_view(request):
    # return render(request,'content.html', {'sesh': request.session['key_copy'], 'group': request.session['group']})
    dict = {'duration': 30,'content_time': 0}
    if request.user.is_authenticated:
        return render(request,'content.html', dict)
    elif "code" in request.session:
        setGroup(request)
        code = LabCode.objects.get(code=request.session['code'])
        dict['content_time'] = code.content_time
        if "group" in request.session and code.content_access:
            return render(request,'content.html',dict)
        else:
            return redirect('waiting-screen')
    else:
        return redirect('home')

def quiz_view(request):
    dict = {'quiz_grade': 0.0, 'duration': 0}
    if request.user.is_authenticated:
        return render(request,'quiz.html', dict)
    elif "code" in request.session:
        code = LabCode.objects.get(code=request.session['code'])
        if "group" in request.session:
            timep = code.content_time + timedelta(minutes=30) - timezone.now()
            timerexpired = False
            if timep.total_seconds() < 0:
                timerexpired = True
            if timerexpired or code.quiz_access:
                if LabProgress.objects.filter(session=request.session['key_copy']).exists():
                    lab = LabProgress.objects.get(session=request.session['key_copy'])
                    dict['quiz_grade'] = lab.quiz
                quiz_time = code.content_time + timedelta(minutes=30)
                dict['quiz_access'] = code.quiz_access
                dict['duration'] = 10
                dict['quiz_time'] = quiz_time
                return render(request,'quiz.html', dict)
            else:
                return redirect('content')
        else:
            return redirect('content')
    else:
        return redirect('home')

def survey_view(request):
    if "code" in request.session or request.user.is_authenticated:
        return render(request,'survey.html')
    else:
        return redirect('home')

def clean_session_view(request):
    request.session.flush()
    return redirect('home')

def experiments_view(request):
    if(request.user.is_authenticated):
        codes = LabCode.objects.all().order_by('-date')
        codes = codes.values()
        for code in codes:
            count = LabProgress.count_participants(LabProgress, code=code['id'])
            code['count'] = count
        dict = {'codes': codes}

        return render(request,'admin/experiments.html', dict)
    else:
        return redirect('home')

def control_panel_view(request, code_id):
    if(request.user.is_authenticated):
        lab = LabCode.objects.get(id=code_id)
        name = lab.code
        dict = {'id': code_id, 'code_id_json': mark_safe(json.dumps(code_id)), 'name': name, 'content_access': lab.content_access, 'quiz_access': lab.quiz_access, 'content_time': "", 'end_time':""}
        data = {'grade': [],  '1': [],'2': [],'3':[], '4': [], 'computer': []}
        for participant in LabProgress.objects.filter(code=code_id):
            if participant.quiz != 0.0:
                data['computer'].append({'id':participant.id,'computer':participant.computer})
                data[participant.group].append(participant.quiz)
                data['grade'].append(participant.quiz)
        fig2 = Figure()
        canvas = FigureCanvas(fig2)
        ax1 = fig2.add_subplot(121)
        ax2 = fig2.add_subplot(122)
        # fig2, ax = plt.subplots(1,2)
        fig2.set_size_inches(14, 5)
        labels = ["Paper","PDF","Interactive","Interactive + Gamification"]
        for i in range(1,5):
            try:
                sns.distplot(data[str(i)], label=labels[i-1], ax=ax2)
                # sns.distplot(data[str(i)], label=labels[i-1], ax=ax[1])
            except:
                pass
        try:
            sns.distplot(data['grade'], label="Total", ax=ax1)
            # sns.distplot(data['grade'], label="Total", ax=ax[0])
        except:
            pass
        ax2.set_title("Grade Distribution per Treatment")
        ax1.set_title("Total Grade Distribution")
        ax1.legend()
        ax2.legend()
        # ax[1].set_title("Grade Distribution per Treatment")
        # ax[0].set_title("Total Grade Distribution")
        # ax[0].legend()
        # ax[1].legend()
        fig2.pad_inches = 0
        buf = io.BytesIO()
        fig2.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        string = base64.b64encode(buf.read())
        uri = 'data:image/png;base64,' + urllib.parse.quote(string)
        dict['image'] = uri
        # Load Survey results
        data['surveys'] = []
        surveys = SurveyData.objects.filter(code=lab)
        for entry in surveys.values():
            entry['date'] = ""
            for x in data['computer']:
                if x['id'] == entry['lab_data_id']:
                    entry['computer'] = x['computer']
                    break
            for i in range(1,20):
                try:
                    entry['s'+str(i)] = json.loads(entry['s'+str(i)])
                except:
                    pass
            data['surveys'].append(entry)
        dict['surveys'] = json.dumps(json.dumps(data['surveys']))
        if lab.content_time:
            dict['content_time'] = lab.content_time
            dict['end_time'] = lab.content_time + timedelta(minutes=30)
        dict['duration'] = 30
        return render(request,'admin/control_panel.html', dict)
    else:
        return redirect('home')

def cash_receipt_view(request):
    dict = {}
    if LabProgress.objects.filter(session=request.session["key_copy"]).exists():
        lab = LabProgress.objects.get(session=request.session["key_copy"])
        dict['payment'] = lab.payment
        dict['session'] = lab.session
        dict['grade'] = lab.quiz
    if request.method == 'POST':
        # print(request.POST)
        # if 'checkbox' in request.POST:
        if 'cash-session' in request.POST:
            code = LabCode.objects.get(code=lab.code)
            CashReceipt.objects.update_or_create(name=request.POST['cash-name'],amount=request.POST['cash-amount'],signature=request.POST['cash-signature']
            ,lab_session=lab,lab_code=code)
            lab.receipt = True
            lab.save()
        else:
            CashReceipt.objects.update_or_create(name=request.POST['cash-name'],amount=request.POST['cash-amount'],signature=request.POST['cash-signature'])

    if(request.user.is_authenticated):
        return render(request,'cash_receipt.html', dict)
    elif "key_copy" in request.session:
        if CashReceipt.objects.filter(lab_session=lab).exists():
            receipt = CashReceipt.objects.get(lab_session=lab)
            # print(receipt.id)
            dict['id'] = receipt.id

    return render(request,'cash_receipt.html', dict)

def econometrics_view(request):
    dict = {}

    if(request.user.is_authenticated):
        # progress = LabProgressSerializer_Metrics(LabProgress.objects.all(), many=True)
        progress = serializers.serialize("json", LabProgress.objects.all(), fields=('code','group','quiz','payment'))
        data = {'group': [],  'grade': []}

        for participant in LabProgress.objects.all():
            if participant.quiz != 0.0:
                data['grade'].append(participant.quiz)
                data['group'].append(participant.group)
        # print(data)
        fig2, ax2 = plt.subplots()
        fig2.set_size_inches(8, 5)
        sns.distplot(data['grade'], label="Paper", ax=ax2)
        buf = io.BytesIO()
        fig2.savefig(buf, format='png')
        buf.seek(0)
        string = base64.b64encode(buf.read())
        uri = 'data:image/png;base64,' + urllib.parse.quote(string)
        dict['image'] = uri
        # print(uri)
        # print('---')
        # dict['data'] = progress
        # print(progress)
        return render(request,'admin/econometrics.html', dict)
