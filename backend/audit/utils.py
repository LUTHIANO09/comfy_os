from .models import AuditLog


def create_audit_log(
    user,
    module,
    action,
    description="",
    object_id=None,
):
    AuditLog.objects.create(
        user=user,
        module=module,
        action=action,
        description=description,
        object_id=object_id,
    )