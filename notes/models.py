from django.db import models as mod


class Note(mod.Model):
    headline = mod.CharField(max_length=100, null=True, blank=True)
    text = mod.TextField(null=True, blank=True)

    def __str__(self):
        return self.headline
