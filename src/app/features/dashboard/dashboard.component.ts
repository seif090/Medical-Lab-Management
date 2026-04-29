import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Users, 
  FlaskConical, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  LucideAngularModule
} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stat-card">
          <p class="text-xs text-slate-500 mb-1">إجمالي المرضى</p>
          <h3 class="text-2xl font-bold">4,281</h3>
          <p class="text-xs text-emerald-600 mt-2 font-bold flex items-center gap-1">
            <lucide-icon name="trending-up" [size]="12"></lucide-icon>
            ↑ 12% منذ الشهر الماضي
          </p>
        </div>

        <div class="stat-card">
          <p class="text-xs text-slate-500 mb-1">عينات اليوم</p>
          <h3 class="text-2xl font-bold">84</h3>
          <p class="text-xs text-sky-600 mt-2 font-bold">12 قيد المعالجة حالياً</p>
        </div>

        <div class="stat-card">
          <p class="text-xs text-slate-500 mb-1">نتائج بانتظار المراجعة</p>
          <h3 class="text-2xl font-bold text-amber-600">15</h3>
          <p class="text-xs text-slate-400 mt-2 font-bold">يتطلب إجراء فوري</p>
        </div>

        <div class="stat-card">
          <p class="text-xs text-slate-500 mb-1">إيرادات اليوم</p>
          <h3 class="text-2xl font-bold text-slate-800">12,450 EGP</h3>
          <p class="text-xs text-emerald-600 mt-2 font-bold">أداء مالي مستقر</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Samples Table -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-lg text-slate-900 border-r-4 border-sky-400 pr-3">تتبع العينات الحديثة</h2>
            <button class="text-sky-600 text-sm font-bold hover:underline underline-offset-4">عرض الكل</button>
          </div>
          
          <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table class="w-full text-right border-collapse text-[13px]">
              <thead class="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th class="px-4 py-3 font-bold text-xs uppercase tracking-wider">رقم العينة</th>
                  <th class="px-4 py-3 font-bold text-xs uppercase tracking-wider">المريض</th>
                  <th class="px-4 py-3 font-bold text-xs uppercase tracking-wider">نوع التحليل</th>
                  <th class="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">الحالة</th>
                  <th class="px-4 py-3 font-bold text-xs uppercase tracking-wider text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let result of recentResults()" class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-4 py-3 font-mono font-bold text-slate-500 text-xs">{{ result.id }}</td>
                  <td class="px-4 py-3 font-bold text-slate-800">{{ result.patient }}</td>
                  <td class="px-4 py-3 text-slate-600 font-medium">{{ result.test }}</td>
                  <td class="px-4 py-3 text-center">
                    <span 
                      class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider inline-block"
                      [ngClass]="{
                        'bg-emerald-100 text-emerald-700': result.status === 'مكتمل',
                        'bg-amber-100 text-amber-700': result.status === 'قيد المعالجة',
                        'bg-blue-100 text-blue-700': result.status === 'بانتظار الجمع'
                      }"
                    >
                      {{ result.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button class="text-sky-600 font-bold hover:text-sky-700 hover:scale-105 transition-transform">
                      {{ result.status === 'مكتمل' ? 'طباعة' : 'متابعة' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Home Visits Sidebar -->
        <div class="space-y-4">
          <h2 class="font-bold text-lg text-slate-900 border-r-4 border-amber-400 pr-3">الزيارات المنزلية اليوم</h2>
          <div class="space-y-3">
            <div *ngFor="let visit of homeVisits()" class="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3 shadow-sm hover:border-slate-300 transition-colors group">
              <div 
                class="w-10 h-10 rounded flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 transition-transform"
                [ngClass]="{
                  'bg-amber-50 text-amber-600': visit.icon === '⏰',
                  'bg-sky-50 text-sky-600': visit.icon === '📍',
                  'bg-emerald-50 text-emerald-600': visit.icon === '✓'
                }"
              >
                {{ visit.icon }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-800">{{ visit.name }} - {{ visit.area }}</p>
                <p class="text-[11px] text-slate-400 font-bold mt-0.5">{{ visit.time }}</p>
              </div>
              <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">{{ visit.status }}</span>
            </div>

            <!-- Reminder Card -->
            <div class="mt-6 p-5 bg-sky-900 border border-sky-800 text-white rounded-lg shadow-lg relative overflow-hidden group">
              <div class="absolute -top-4 -left-4 w-16 h-16 bg-sky-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div class="relative z-10">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-sky-300">تذكير الإدارة</p>
                <p class="text-[13px] leading-relaxed font-medium">يجب مراجعة مخزون الكواشف المخبرية (Reagents) لجميع أجهزة المناعة قبل نهاية الأسبوع.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  stats = signal({
    patients: 4281,
    testsToday: 84,
    pendingReview: 15,
    revenue: 12450
  });

  recentResults = signal([
    { id: 'L-2023-882', patient: 'سارة محمد علي', test: 'CBC + Ferritin', time: '10:15 AM', status: 'مكتمل' },
    { id: 'L-2023-883', patient: 'أحمد حسن القحطاني', test: 'HBA1c', time: '10:45 AM', status: 'قيد المعالجة' },
    { id: 'L-2023-884', patient: 'فاطمة الزهراء', test: 'Kidney Profile', time: '11:05 AM', status: 'بانتظار الجمع' },
    { id: 'L-2023-885', patient: 'ياسر جلال', test: 'Lipid Profile', time: '11:20 AM', status: 'قيد المعالجة' },
    { id: 'L-2023-886', patient: 'ريم عبدالله', test: 'Vitamin D', time: '11:35 AM', status: 'مكتمل' },
  ]);

  homeVisits = signal([
    { name: 'خالد عمر', area: 'المعادي', time: '02:00 مساءً', status: 'قيد التنفيذ', icon: '⏰' },
    { name: 'منيرة أحمد', area: 'مدينة نصر', time: '04:30 مساءً', status: 'بانتظار التحرك', icon: '📍' },
    { name: 'إبراهيم حسن', area: 'التجمع', time: 'نم سحب العينة بنجاح', status: 'تم', icon: '✓' },
  ]);
}
