from django.db import models
from django.utils import timezone

from django.dispatch import receiver
from django.db.models import signals


class LabCode(models.Model):
  """
  Lab Code. This will be used to match the responses to a laboratory session.
  """
  code = models.CharField(max_length=50, blank=False, unique=True)
  date = models.DateTimeField(blank=True)
  content_access = models.BooleanField(default=False)
  quiz_access = models.BooleanField(default=False)
  content_time = models.DateTimeField(blank=True, null=True)
  test = models.BooleanField(default=False)
  

  class Meta:
    db_table = 'labcode'
    verbose_name = 'Lab Code'
    verbose_name_plural = 'Lab Codes'

  def __str__(self):
    return self.code
  def num(self):
    return self.id

  def __unicode__(self):
    return self.code

class LabProgress(models.Model):
  """
  Lab Progress. This will be used to see how far the users are.
  """
  code = models.ForeignKey(LabCode, on_delete=models.CASCADE)
  date = models.DateTimeField(default=timezone.now)
  session = models.CharField(max_length=320, blank=False)
  computer = models.PositiveSmallIntegerField(blank=True)
  instructions = models.BooleanField(default=False)
  consent = models.BooleanField(default=False)
  group = models.CharField(max_length=50, blank=True)
  content = models.PositiveSmallIntegerField(default=0)
  quiz = models.FloatField(default=0)
  survey = models.BooleanField(default=False)
  payment = models.FloatField(default=0)
  receipt = models.BooleanField(default=False)
  withdraw = models.BooleanField(default=False)


  class Meta:
    db_table = 'labprogress'
    verbose_name = 'Lab Progress'
    verbose_name_plural = 'Lab Progress'

  def __str__(self):
    return self.session
  def __unicode__(self):
    return self.session

  def count_participants(self, code):
    count = self.objects.filter(code=code).count()
    return count
