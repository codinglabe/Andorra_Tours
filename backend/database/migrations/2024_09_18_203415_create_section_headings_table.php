<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('section_headings', function (Blueprint $table) {
            $table->id();
            $table->string("heading_for")->nullable();
            $table->string("heading")->unique()->nullable();
            $table->string("sub_heading")->unique()->nullable();
            $table->enum('status',['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_headings');
    }
};
