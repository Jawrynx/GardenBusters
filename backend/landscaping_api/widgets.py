from django import forms

class ListWidget(forms.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = ''
        if not isinstance(value, str):
            value = '\n'.join([f'* {item}' for item in value])
        return super().render(name, value, attrs, renderer)