from rest_framework import routers

from notes.views import NoteViewSet

router = routers.SimpleRouter()
router.register(r"", NoteViewSet)

urlpatterns = router.urls
