<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;

use App\Models\User;
//use Illuminate\Auth\Access\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\director\StaffController as DirectorStaffController;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    protected function getRole(User $user)
    {
        $role = 'none';
        if ($user) {
            $role = DB::table('roles')->where('id', $user->role_id)->get()->first();
            $role = $role->name;
            return $role;
        }
    }
    public function boot(): void
    {

        Gate::define('get-booking', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('get-employee', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('edit-employee', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('get-staff', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('get-tasks', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор', 'горничная']);
        });

        Gate::define('add-task', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('change-tasks-status', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор', 'горничная']);
        });

        Gate::define('director-get-staff', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('director-get-employee', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('director-get-all-positions', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('director-get-all-roles', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('director-create-employee', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });

        Gate::define('director-edit-employee', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('director-dismiss-user', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('get-rooms', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор',]);
        });
        Gate::define('get-room', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор',]);
        });
        Gate::define('get-check-in-rooms', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор',]);
        });
        Gate::define('get-rooms-for-cleaning', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор', 'горничная']);
        });
        Gate::define('get-free-rooms-period', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('book-room', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('cancel-book-room', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('chek-in-room', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('aviction-from-room', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
        Gate::define('get-count-staff', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('get-count-staff-dismiss', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('get-count-rooms', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('get-count-guests', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('get-my-data', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('get-update-my-data', function (User $user) {
            return in_array($this->getRole($user), ['директор',]);
        });
        Gate::define('admin-delete-booking', function (User $user) {
            return in_array($this->getRole($user), ['директор', 'администратор']);
        });
    }
}
