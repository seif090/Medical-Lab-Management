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
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stat-card group hover:bg-sky-600 transition-all cursor-default">
          <p class="text-[10px] uppercase font-black text-slate-400 group-hover:text-sky-100 tracking-widest mb-1">إجمالي المرضى</p>
          <h3 class="text-2xl font-black text-slate-800 group-hover:text-white">{{ stats().patients }}</h3>
          <span class="text-[10px] text-emerald-600 font-bold group-hover:text-emerald-300 mt-2 block">+12% منذ الشهر الماضي</span>
        </div>

        <div class="stat-card group hover:bg-emerald-600 transition-all cursor-default">
          <p class="text-[10px] uppercase font-black text-slate-400 group-hover:text-emerald-100 tracking-widest mb-1">عينات اليوم</p>
          <h3 class="text-2xl font-black text-slate-800 group-hover:text-white">{{ stats().testsToday }}</h3>
          <div class="w-full bg-slate-100 h-1 rounded-full mt-3 group-hover:bg-emerald-400/30 overflow-hidden">
             <div class="bg-emerald-500 h-full w-[65%] group-hover:bg-white"></div>
          </div>
        </div>

        <div class="stat-card group hover:bg-amber-600 transition-all cursor-default">
          <p class="text-[10px] uppercase font-black text-slate-400 group-hover:text-amber-100 tracking-widest mb-1">بانتظار المراجعة</p>
          <h3 class="text-2xl font-black text-slate-800 group-hover:text-white">{{ stats().pendingReview }}</h3>
          <span class="text-[10px] text-amber-700 font-bold group-hover:text-amber-200 mt-2 block italic underline decoration-dotted">تتطلب فحص الطبيب</span>
        </div>

        <div class="stat-card group hover:bg-slate-900 transition-all cursor-default">
          <p class="text-[10px] uppercase font-black text-slate-400 group-hover:text-slate-400 tracking-widest mb-1">إيرادات اليوم</p>
          <h3 class="text-2xl font-black text-slate-800 group-hover:text-sky-400 font-mono">{{ stats().revenue | number }} EGP</h3>
          <span class="text-[10px] text-sky-600 font-bold group-hover:text-sky-300 mt-2 block">أداء مستقر</span>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div class="xl:col-span-3 space-y-6">
          <!-- Samples Table -->
          <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 class="font-bold text-sm text-slate-700 border-r-4 border-sky-400 pr-3">تتبع العينات الحديثة</h2>
              <button class="text-sky-600 text-[11px] font-bold hover:underline">عرض السجل الكامل</button>
            </div>
            <table class="w-full text-right border-collapse text-[13px]">
              <thead class="bg-slate-50/50 text-slate-500 border-b border-slate-100 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th class="px-4 py-3">رقم العينة</th>
                  <th class="px-4 py-3">المريض</th>
                  <th class="px-4 py-3">نوع التحليل</th>
                  <th class="px-4 py-3 text-center">الحالة</th>
                  <th class="px-4 py-3 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr *ngFor="let result of recentResults()" class="hover:bg-slate-50/30 transition-colors group">
                  <td class="px-4 py-3 font-mono font-bold text-slate-400 text-[11px]">{{ result.id }}</td>
                  <td class="px-4 py-3 font-bold text-slate-800">{{ result.patient }}</td>
                  <td class="px-4 py-3 text-slate-600 font-medium">{{ result.test }}</td>
                  <td class="px-4 py-3 text-center">
                    <span 
                      class="px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider inline-block"
                      [ngClass]="{
                        'bg-emerald-50 text-emerald-700 border border-emerald-100': result.status === 'مكتمل',
                        'bg-amber-50 text-amber-700 border border-amber-100': result.status === 'قيد المعالجة',
                        'bg-sky-50 text-sky-700 border border-sky-100': result.status === 'بانتظار الجمع'
                      }"
                    >
                      {{ result.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button class="text-sky-600 font-bold hover:text-sky-700 text-[11px]">
                      {{ result.status === 'مكتمل' ? 'طباعة' : 'متابعة' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Home Visits sidebar block moved here -->
            <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
               <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                 <h3 class="text-sm font-bold text-slate-700">الزيارات المنزلية اليوم</h3>
                 <span class="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-black">4 زيارات</span>
               </div>
               <div class="p-3 space-y-2">
                 <div *ngFor="let visit of homeVisits()" class="p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg flex items-center gap-3 transition-all group">
                    <div class="w-8 h-8 rounded bg-white border border-slate-100 shadow-sm flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                      {{ visit.icon }}
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-bold text-slate-800 leading-none mb-1">{{ visit.name }}</p>
                      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{{ visit.area }} • {{ visit.time }}</p>
                    </div>
                 </div>
               </div>
            </div>

            <!-- News/Alerts -->
            <div class="bg-indigo-900 text-white rounded-lg p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
               <lucide-icon name="beaker" [size]="120" class="absolute -right-10 -bottom-10 text-white/5"></lucide-icon>
               <div class="relative z-10">
                 <h4 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-sky-400">تحديثات النظام</h4>
                 <p class="text-sm font-bold leading-relaxed">وصل تحديث جديد لقاعدة بيانات التحاليل. تم إضافة 12 اختباراً جينياً جديداً لدليل التحاليل.</p>
               </div>
               <button class="mt-6 w-full py-2 bg-indigo-800 hover:bg-indigo-700 rounded text-[11px] font-black uppercase tracking-widest border border-indigo-700 transition-all">تحميل الدليل الجديد</button>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Quick Actions Panel -->
          <div class="bg-[#0f172a] text-white rounded-lg p-5 shadow-lg border border-slate-800">
             <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">اختصارات المهام</h3>
             <div class="grid grid-cols-2 gap-2">
                <button routerLink="/patients" class="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 group">
                  <lucide-icon name="user-plus" [size]="20" class="text-sky-400 mb-2 group-hover:scale-110 transition-transform"></lucide-icon>
                  <span class="text-[10px] font-bold">مريض جديد</span>
                </button>
                <button routerLink="/samples" class="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 group">
                  <lucide-icon name="beaker" [size]="20" class="text-amber-400 mb-2 group-hover:scale-110 transition-transform"></lucide-icon>
                  <span class="text-[10px] font-bold">سحب عينة</span>
                </button>
                <button routerLink="/billing" class="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 group">
                  <lucide-icon name="receipt" [size]="20" class="text-emerald-400 mb-2 group-hover:scale-110 transition-transform"></lucide-icon>
                  <span class="text-[10px] font-bold">فاتورة</span>
                </button>
                <button routerLink="/home-visit" class="flex flex-col items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 group">
                  <lucide-icon name="map-pin" [size]="20" class="text-rose-400 mb-2 group-hover:scale-110 transition-transform"></lucide-icon>
                  <span class="text-[10px] font-bold">زيارة منزلية</span>
                </button>
             </div>
          </div>

          <!-- Equipment Health -->
          <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
             <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
               حالة الأجهزة
               <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
             </h3>
             <div class="space-y-3">
                <div class="flex items-center justify-between group">
                   <div class="flex items-center gap-2">
                     <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                     <span class="text-xs font-bold text-slate-700">Cobas 6000</span>
                   </div>
                   <span class="text-[9px] font-black text-slate-300">أداء 98%</span>
                </div>
                <div class="flex items-center justify-between group">
                   <div class="flex items-center gap-2">
                     <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                     <span class="text-xs font-bold text-slate-700">Sysmex XN</span>
                   </div>
                   <span class="text-[9px] font-black text-slate-300">نشط</span>
                </div>
                <div class="flex items-center justify-between group opacity-40">
                   <div class="flex items-center gap-2">
                     <div class="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                     <span class="text-xs font-bold text-slate-400">Backup Gen</span>
                   </div>
                   <span class="text-[9px] font-black text-slate-300">غير نشط</span>
                </div>
             </div>
             <div class="mt-4 p-3 bg-rose-50 border border-rose-100 rounded">
                <p class="text-[10px] text-rose-700 font-bold leading-tight">تنبيه: "Centrifuge B" تتطلب صيانة دورية يوم غد.</p>
             </div>
          </div>

          <!-- Active Users -->
          <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
             <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">الموظفين المناوبين (6)</h3>
             <div class="flex -space-x-2 space-x-reverse">
                <div *ngFor="let i of [1,2,3,4,5]" class="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">M</div>
                <div class="w-7 h-7 rounded-full border-2 border-white bg-sky-100 flex items-center justify-center text-[9px] font-black text-sky-600">+1</div>
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
