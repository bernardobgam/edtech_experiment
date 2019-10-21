from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import *
import json
import csv
from django.http import HttpResponse
from .serializers import LabCodeSerializer, LabProgressSerializer

from data.models import QuizData, SurveyData
# Create your views here.

class GetLabCode(generics.RetrieveUpdateDestroyAPIView):
    """
    Match lab codes.
    """
    # permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        """
        Retrieve codes.
        """
# LabCodeSerializer
        codes = LabCode.objects.all()
        s_code = LabCodeSerializer(codes,many=True)
        return Response(s_code.data, status=status.HTTP_200_OK)

class GetLabProgress(generics.RetrieveUpdateDestroyAPIView):
    """
    Get progress for all lab participants for a given code.
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, code_id, format=None):
        participants = LabProgress.objects.filter(code=code_id)
        p_s = LabProgressSerializer(participants, many=True)

        return Response(p_s.data, status=status.HTTP_201_CREATED)

class LabProgressGroups(generics.CreateAPIView):
    """
    Assign randomised groups to all participants of a lab code.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = LabProgressSerializer

    def post(self, request, code_id, format=None):

        for p in json.loads(request.data['participants']):
            participant = LabProgress.objects.get(session=p['session'])
            if participant.group == "":
                participant.group = p['group']
                participant.save()

        return Response("", status=status.HTTP_200_OK)

class UpdateLabProgress(generics.RetrieveUpdateAPIView):
    """
    Update progress for a given participant.
    """
    permission_classes = (AllowAny,)
    def put(self, request, format=None):

        if LabProgress.objects.filter(session=request.data['session']).exists():
            stage = request.data['stage']
            obj = LabProgress.objects.get(session=request.data['session'])

            if stage == 'instructions' and obj.instructions == False:
                obj.instructions = True
                obj.save()
            elif stage == 'consent' and obj.consent == False:
                obj.consent = True
                obj.save()


        return Response("", status=status.HTTP_201_CREATED)

class GroupRetrieve(generics.RetrieveUpdateAPIView):
    """
    Retrieve the group information for a particular participant.
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):

        session = request.GET.get('session', '')
        if LabProgress.objects.filter(session=session).exists():
            progress = LabProgress.objects.get(session=session)
            if not progress.group == "":
                group = progress.group
            else:
                group = None
            data = {'group': group}


            return Response(data, status=status.HTTP_200_OK)

class RetrieveAccess(generics.RetrieveUpdateAPIView):
    """
    Retrieve the boolean for access for a given lab code.
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        access = request.GET.get('access', '')

        code = request.GET.get('code', '')
        if LabCode.objects.filter(code=code).exists():
            if access == "content":
                content_access = LabCode.objects.get(code=code).content_access
                data = {'content_access': content_access}
            elif access == "quiz":
                quiz_access = LabCode.objects.get(code=code).quiz_access
                data = {'quiz_access': quiz_access}
            else:
                data = {}

            return Response(data, status=status.HTTP_200_OK)

class UpdateAccess(generics.RetrieveUpdateAPIView):
    """
    Set access for the content for a given lab code.
    """
    permission_classes = (AllowAny,)
    def put(self, request, format=None):

        code = request.data['code']
        access = request.data['access']
        if LabCode.objects.filter(code=code).exists():
            lab = LabCode.objects.get(code=code)
            if access == "content":
                lab.content_access = True
                lab.content_time = timezone.now()
            elif access == "quiz":
                lab.quiz_access = True
            lab.save()

            return Response("", status=status.HTTP_200_OK)

class RetrieveAllData(generics.RetrieveUpdateAPIView):
    """
    Retrieve the boolean for access for a given lab code.
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="experimentData.csv"'
        writer = csv.writer(response)
        lab = LabProgress.objects.all()
        code = LabCode.objects.all()
        surveys = SurveyData.objects.all()
        quiz = QuizData.objects.all()
        participants = []
        participant_dict = {}
        codes_dict = {}

        def d(x):
            try:
                y = json.loads(x)
                if len(y) == 1:
                    y = y[0]
            except:
                y = x
            return y

        for c in code:
            codes_dict[c.code] = c.test
        for i in lab:
            if codes_dict[i.code.code] == False and i.survey == True:
                participant_dict[i.session] = len(participant_dict)
                participants.append([i.id, i.session, i.computer, i.date, i.code, i.instructions, i.consent, i.receipt, i.survey, i.group, i.quiz])
        for j in quiz:
            if j.lab_data.session in participant_dict:
                ind = participant_dict[j.lab_data.session]
                grades = j.q()
                if len(participants[ind]) < 13:
                    multiple_quiz = False
                    # participants[ind].extend([j.seconds_taken, grades["q1"], grades["q2"], grades["q3"], grades["q4"], grades["q5"], grades["q6"], grades["q7"], multiple_quiz])
                    participants[ind].extend([j.seconds_taken, j.q1, j.q2, j.q3, j.q4, j.q5, j.q6, j.q7, multiple_quiz])
                else:
                    multiple_quiz = True
                    participants[ind][len(participants[ind])-1] = multiple_quiz
        for k in surveys:
            if k.lab_data.session in participant_dict:
                ind = participant_dict[k.lab_data.session]
                if len(participants[ind]) < 21:
                    multiple_survey = False
                    participants[ind].extend([k.seconds_taken, d(k.s1), d(k.s2), d(k.s3), d(k.s4), d(k.s5), d(k.s6), d(k.s7), d(k.s8), d(k.s9), d(k.s10), d(k.s11), d(k.s12), d(k.s13), d(k.s14), d(k.s15), d(k.s16), d(k.s17), d(k.s18), d(k.s19), multiple_survey])
                else:
                    multiple_survey = True
                    participants[ind][len(participants[ind])-1] = multiple_survey

        # print(participants)
        writer.writerow(['participant_id', 'session', 'computer', 'date', 'code', 'instructions', 'consent', 'receipt', 'survey', 'treatment',
        'quiz', 'quiz_seconds_taken', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7','multiple_quiz',
        'survey_seconds_taken', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17','s18', 's19','multiple_surveys'])
        for p in participants:
            writer.writerow(p)
        # print('hello')

        return response
