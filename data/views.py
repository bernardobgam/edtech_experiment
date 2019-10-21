from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
import json
from django.utils import timezone
from datetime import datetime, timedelta

from lab.models import LabProgress, LabCode
from data.models import QuizData, SurveyData
# Create your views here.


class CreateQuizSubmission(generics.RetrieveUpdateAPIView):
    """
    Create Quiz Entry.
    """
    permission_classes = (AllowAny,)
    def post(self, request, format=None):

        # quiz_max_payment = 30
        quiz_max_payment = 5
        experiment_fee = 15
        show_up_fee = 5

        correct_answers = {
        "q1": ["a","c","d"],
        "q2": ["b","c","d"],
        "q3": ["a"],
        "q4": ["d"],
        "q5": ["a"],
        "q6": ["b"],
        "q7": ["b","d"]
        }

        if LabProgress.objects.filter(session=request.data['session']).exists():
            lab = LabProgress.objects.get(session=request.data['session'])
            code = LabCode.objects.get(code=lab.code)
            quiz_time = code.content_time + timedelta(minutes=30)
            selected_answers = json.loads(request.data['quiz_answers'])
            sum_grade = 0
            for i in range(7):
                q = "q"+str(i+1)
                selected_length = len(selected_answers[q])
                correct_length = len(correct_answers[q])
                correct = 0
                incorrect = 0
                overselected = 0
                for element in correct_answers[q]:
                    if element in selected_answers[q]:
                        correct += 1
                incorrect = correct_length - correct
                overselected = selected_length - correct
                if overselected == 0:
                    grade = correct / correct_length
                    sum_grade += grade
                else:
                    grade = (correct - overselected) / correct_length
                    if grade < 0:
                        grade = 0
                    sum_grade += grade
                # print( str(q) + " incorrect " + str(incorrect) + ",overselected "+str(overselected) +", and correct " + str(correct) +" grade ="+str(grade))
                # print("the final grade is: " + str(sum_grade/7))
            sum_grade = float("{0:.2f}".format(sum_grade))
            final_grade = float("{0:.2f}".format(sum_grade/7))
            payment = float("{0:.2f}".format(final_grade * quiz_max_payment))

            # Payment $$$$$$$
            # final_payment = payment + show_up_fee
            final_payment = payment + show_up_fee + experiment_fee

            # print('the points gotten are: ' + str(sum_grade))
            # print('payment is ' + str(payment) + ' final payment is ' + str(final_payment))
            # print('the final grade is ' + str(final_grade))
            # if not QuizData.objects.filter(lab_data=lab).exists():
            QuizData.objects.create(lab_data=lab,
                                                code=code,
                                                seconds_taken=request.data['seconds_taken'],
                                                q1=json.dumps(selected_answers["q1"]),
                                                q2=json.dumps(selected_answers["q2"]),
                                                q3=json.dumps(selected_answers["q3"]),
                                                q4=json.dumps(selected_answers["q4"]),
                                                q5=json.dumps(selected_answers["q5"]),
                                                q6=json.dumps(selected_answers["q6"]),
                                                q7=json.dumps(selected_answers["q7"]),
                                                grade=final_grade)
            if lab.quiz == 0.0:
                lab.quiz = final_grade
                lab.payment = final_payment
                lab.save()

        return Response("", status=status.HTTP_201_CREATED)


class CreateSurveySubmission(generics.RetrieveUpdateAPIView):
    """
    Create Survey Entry.
    """
    permission_classes = (AllowAny,)
    def post(self, request, format=None):

        print('survey submitted')
        print(request.data['survey_answers'])
        print(request.data['seconds_taken'])
        print(request.data['session'])
        answers = json.loads(request.data['survey_answers'])
        if LabProgress.objects.filter(session=request.data['session']).exists():
            lab = LabProgress.objects.get(session=request.data['session'])
            code = LabCode.objects.get(code=lab.code)
            SurveyData.objects.update_or_create(
                    lab_data=lab,
                    code=code,
                    seconds_taken=request.data['seconds_taken'],
                    s1=json.dumps(answers['survey1']),
                    s2=json.dumps(answers['survey2']),
                    s3=json.dumps(answers['survey3']),
                    s4=json.dumps(answers['survey4']),
                    s5=json.dumps(answers['survey5']),
                    s6=json.dumps(answers['survey6']),
                    s7=json.dumps(answers['survey7']),
                    s8=json.dumps(answers['survey8']),
                    s9=json.dumps(answers['survey9']),
                    s10=json.dumps(answers['survey10']),
                    s11=json.dumps(answers['survey11']),
                    s12=json.dumps(answers['survey12']),
                    s13=json.dumps(answers['survey13']),
                    s14=json.dumps(answers['survey14']),
                    s15=json.dumps(answers['survey15']),
                    s16=json.dumps(answers['survey16']),
                    s17=json.dumps(answers['survey17']),
                    s18=json.dumps(answers['survey18']),
                    s19=json.dumps(answers['survey19']),
                    )
            lab.survey = True
            lab.save()

        return Response("", status=status.HTTP_201_CREATED)
