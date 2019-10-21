from django.db import models
from lab.models import LabProgress, LabCode
from django.utils import timezone
from django.db.models import Sum
# Create your models here.

class ParticipationConsent(models.Model):
    """Saves the consent forms"""

    lab_session = models.ForeignKey(LabProgress, on_delete=models.CASCADE)
    lab_code = models.ForeignKey(LabCode, on_delete=models.CASCADE)
    name = models.CharField(max_length=320, blank=False)
    consent = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)


class CashReceipt(models.Model):
    """Cash Payment Receipt"""

    lab_session = models.ForeignKey(LabProgress, on_delete=models.CASCADE, blank=True, null=True)
    lab_code = models.ForeignKey(LabCode, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=320, blank=False)
    amount = models.FloatField(blank=False)
    date = models.DateTimeField(default=timezone.now)
    signature = models.TextField()

    def pay_sum(self):
        return self.aggregate(Sum('amount'))
