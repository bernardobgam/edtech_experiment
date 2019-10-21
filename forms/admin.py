from django.contrib import admin
from forms.models import ParticipationConsent, CashReceipt
# Register your models here.


@admin.register(ParticipationConsent)
class ParticipationConsentAdmin( admin.ModelAdmin ):
    list_display = ('id', 'lab_session', 'lab_code', 'name', 'consent', 'date')

@admin.register(CashReceipt)
class CashReceiptAdmin( admin.ModelAdmin ):
    list_display = ('id', 'lab_session', 'lab_code', 'name', 'amount', 'signature', 'date')
