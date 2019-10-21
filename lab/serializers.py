from rest_framework import serializers
from .models import LabCode, LabProgress

class LabCodeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'code',
            'date',

        )
        model = LabCode

class LabProgressSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'code',
            'date',
            'session',
            'instructions',
            'computer',
            'consent',
            'content',
            'group',
            'quiz',
            'survey',
            'payment',
            'withdraw',
            'receipt',
        )
        model = LabProgress

class LabProgressSerializer_Metrics(serializers.ModelSerializer):
    class Meta:
        fields = (
            'code',
            'date',
            'group',
            'quiz',
            'payment',
        )
        model = LabProgress
