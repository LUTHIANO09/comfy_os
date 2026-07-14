from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


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

            return Response(
                {
                    "message": "Product archived because it has sales history.",
                    "action": "archived",
                },
                status=status.HTTP_200_OK,
            )

        # Product has never been sold → delete permanently
        self.perform_destroy(product)

        return Response(
            {
                "message": "Product deleted successfully.",
                "action": "deleted",
            },
            status=status.HTTP_200_OK,
        )