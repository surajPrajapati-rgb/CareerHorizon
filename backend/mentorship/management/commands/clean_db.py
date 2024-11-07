from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Clean the table database by dropping all tables in MySQL.'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Temporarily disable foreign key constraints in MySQL
            cursor.execute("SET foreign_key_checks = 0;")
            
            try:
                # Get all tables
                cursor.execute("SHOW TABLES;")
                tables = [table[0] for table in cursor.fetchall()]

                # Build dependency graph
                dependencies = {}
                for table in tables:
                    cursor.execute(f"SELECT referenced_table_name FROM information_schema.key_column_usage WHERE table_schema = DATABASE() AND table_name = '{table}' AND referenced_table_name IS NOT NULL;")
                    foreign_keys = cursor.fetchall()
                    dependencies[table] = [fk[0] for fk in foreign_keys]  # fk[0] is the referenced table name

                # Topological sort to determine correct drop order
                drop_order = []
                visited = set()
                temp_visited = set()

                def topological_sort(table):
                    if table in temp_visited:
                        raise ValueError(f"Circular dependency detected involving table {table}")
                    if table not in visited:
                        temp_visited.add(table)
                        for dep_table in dependencies.get(table, []):
                            if dep_table in tables:  # Only process if the dependent table exists
                                topological_sort(dep_table)
                        temp_visited.remove(table)
                        visited.add(table)
                        drop_order.append(table)

                # Process all tables
                for table in tables:
                    if table not in visited:
                        topological_sort(table)

                # Drop tables in reverse order (most dependent first)
                for table in reversed(drop_order):
                    try:
                        cursor.execute(f"DROP TABLE IF EXISTS `{table}`;")
                        self.stdout.write(
                            self.style.SUCCESS(f'Successfully dropped table: {table}')
                        )
                    except Exception as e:
                        self.stdout.write(
                            self.style.ERROR(f'Error dropping table {table}: {str(e)}')
                        )

            finally:
                # Re-enable foreign key constraints
                cursor.execute("SET foreign_key_checks = 1;")

        self.stdout.write(
            self.style.SUCCESS('Database cleanup completed successfully.')
        )
