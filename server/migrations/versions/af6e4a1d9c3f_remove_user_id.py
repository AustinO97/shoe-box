"""remove user_id

Revision ID: af6e4a1d9c3f
Revises: c784556b5a6f
Create Date: 2024-07-04 15:26:56.430584

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'af6e4a1d9c3f'
down_revision = 'c784556b5a6f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('purchase_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('purchase_date', sa.DATE(), nullable=True))

    # ### end Alembic commands ###
