from django.db import models
from django.utils import timezone
import json
from lab.models import LabCode, LabProgress

# Create your models here.
correct_answers = {
"q1": ["a","c","d"],
"q2": ["b","c","d"],
"q3": ["a"],
"q4": ["d"],
"q5": ["a"],
"q6": ["b"],
"q7": ["b","d"]
}

class QuizData(models.Model):
  """
  Model to store quiz.
  """
  lab_data = models.ForeignKey(LabProgress, on_delete=models.CASCADE)
  code = models.ForeignKey(LabCode, on_delete=models.CASCADE)
  date = models.DateTimeField(default=timezone.now)
  seconds_taken = models.FloatField(null=True)
  q1 = models.TextField(null=True)
  q2 = models.TextField(null=True)
  q3 = models.TextField(null=True)
  q4 = models.TextField(null=True)
  q5 = models.TextField(null=True)
  q6 = models.TextField(null=True)
  q7 = models.TextField(null=True)
  grade = models.FloatField(null=True)

  def q(self):
      selected_answers = {}
      grades = {}
      selected_answers["q1"] = json.loads(self.q1)
      selected_answers["q2"] = json.loads(self.q2)
      selected_answers["q3"] = json.loads(self.q3)
      selected_answers["q4"] = json.loads(self.q4)
      selected_answers["q5"] = json.loads(self.q5)
      selected_answers["q6"] = json.loads(self.q6)
      selected_answers["q7"] = json.loads(self.q7)
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
              grades[q] = grade
          else:
              grade = (correct - overselected) / correct_length
              if grade < 0:
                  grade = 0
              grades[q] = grade
      return grades

  class Meta:
    db_table = 'quiz'
    verbose_name = 'Quiz'
    verbose_name_plural = 'Quizzes'

class SurveyData(models.Model):
  """
  Model to store quiz.
  """
  lab_data = models.ForeignKey(LabProgress, on_delete=models.CASCADE)
  code = models.ForeignKey(LabCode, on_delete=models.CASCADE)
  date = models.DateTimeField(default=timezone.now)
  seconds_taken = models.FloatField(null=True)
  s1 = models.TextField(null=True)
  s2 = models.TextField(null=True)
  s3 = models.TextField(null=True)
  s4 = models.TextField(null=True)
  s5 = models.TextField(null=True)
  s6 = models.TextField(null=True)
  s7 = models.TextField(null=True)
  s8 = models.TextField(null=True)
  s9 = models.TextField(null=True)
  s10 = models.TextField(null=True)
  s11 = models.TextField(null=True)
  s12 = models.TextField(null=True)
  s13 = models.TextField(null=True)
  s14 = models.TextField(null=True)
  s15 = models.TextField(null=True)
  s16 = models.TextField(null=True)
  s17 = models.TextField(null=True)
  s18 = models.TextField(null=True)
  s19 = models.TextField(null=True)


  class Meta:
    db_table = 'survey'
    verbose_name = 'Survey'
    verbose_name_plural = 'Surveys'
