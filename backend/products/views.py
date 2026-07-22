from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from audit.utils import create_audit_log
from audit.models import AuditLog

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        product = serializer.save()

        create_audit_log(
            user=self.request.user,
            module="Products",
            action=AuditLog.Action.CREATE,
            description=f"Created product '{product.name}'",
            object_id=product.id,
        )


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()


        # Product has sales history → archive it
        if product.saleitem_set.exists():
            product.is_active = False
            product.save(update_fields=["is_active"])

            create_audit_log(
                user=request.user,
                module="Products",
                action=AuditLog.Action.DELETE,
                description=f"Archived product '{product.name}'",
                object_id=product.id,
            )

            return Response(
                {
                    "message": "Product archived because it has sales history.",
                    "action": "archived",
                },
                status=status.HTTP_200_OK,
            )

        # Product has never been sold → delete permanently
        product_name = product.name
        product_id = product.id

        self.perform_destroy(product)

        create_audit_log(
            user=request.user,
            module="Products",
            action=AuditLog.Action.DELETE,
            description=f"Deleted product '{product_name}'",
            object_id=product_id,
        )

        return Response(
            {
                "message": "Product deleted successfully.",
                "action": "deleted",
            },
            status=status.HTTP_200_OK,
        )
    def perform_update(self, serializer):
        product = serializer.save()

        create_audit_log(
            user=self.request.user,
            module="Products",
            action=AuditLog.Action.UPDATE,
            description=f"Updated product '{product.name}'",
            object_id=product.id,
        )